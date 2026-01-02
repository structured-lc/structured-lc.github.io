# Leetcode 3767 (Medium): Maximize Points After Choosing K Tasks [Practice](https://leetcode.com/problems/maximize-points-after-choosing-k-tasks)

## Description
You are given two arrays `technique1` and `technique2`, each representing points you can earn by completing a task using the respective technique. You must complete **at least K tasks using technique 1** (any K tasks, not necessarily the first K). The remaining tasks can be completed using either technique. Your goal is to **maximize total points** by choosing which tasks to complete and which technique to use for each task.

## Examples

**Example 1:**
Input: `technique1 = [5, 10, 5], technique2 = [2, 10, 8], k = 1`
Output: `22`
*Explanation: Complete task 1 with technique 1 (10 points), task 2 with technique 2 (10 points), task 0 with technique 2 (2 points). Total = 10 + 10 + 2 = 22.*

**Example 2:**
Input: `technique1 = [10, 20, 30], technique2 = [5, 15, 25], k = 0`
Output: `60`
*Explanation: Since k = 0, use the better technique for each task. Max(10, 5) + Max(20, 15) + Max(30, 25) = 10 + 20 + 30 = 60.*

**Example 3:**
Input: `technique1 = [1, 2, 3], technique2 = [4, 5, 6], k = 3`
Output: `15`
*Explanation: Must use technique 1 for all 3 tasks. Total = 1 + 2 + 3 = 6... Actually, we need technique 1 for at least k tasks, so we could choose any 3. Best is technique 2 for each: 4 + 5 + 6 = 15. But we must use technique 1 for at least k=3 tasks. So best is 1 + 2 + 3 = 6.*

## Thought Process

**Brute Force:** Try all combinations of choosing k tasks for technique 1 and assigning remaining tasks greedily. This would be O(C(n,k) × n), which is exponential.

**Key Insight:** The constraint "at least k tasks using technique 1" is the critical part. We can think of this as:
- We **must** pick k tasks where technique 1 is beneficial (or at least consider them).
- For the remaining n−k tasks, we pick the **better technique** for each.

**Greedy Approach:**
1. Calculate the **difference** `diff[i] = technique1[i] - technique2[i]` for each task. This tells us how much we gain/lose by picking technique 1 instead of technique 2.
2. Sort tasks by this difference in **descending order**. Tasks with the largest positive difference are best candidates for technique 1.
3. **Greedily select the top k tasks** by difference for technique 1 (these are least costly to do with technique 1).
4. For the **remaining n−k tasks**, pick technique 1 only if the difference is positive (i.e., `diff[i] > 0`).
5. For all non-selected tasks, use technique 2.

**Why this works:** By sorting by difference and taking the top k, we're forced to complete k tasks with technique 1, but we choose the k tasks that have the smallest negative impact (or largest positive gain). Then for remaining tasks, we only switch to technique 1 if it actually helps.

**Trade-off:** Greedy selection by difference ensures we satisfy the k constraint while maximizing total points.

## Corner cases to consider

- k = 0: No constraint, simply pick max(technique1[i], technique2[i]) for each task.
- k = n: All tasks must use technique 1, return sum of technique1.
- All differences negative: We must still pick k tasks with technique 1 (pick the least negative ones).
- Single task (n = 1, k = 1): Must use technique 1 for the only task.
- All differences equal: Order doesn't matter among tied tasks.

## Solution

```python
def maximizePoints(technique1, technique2, k):
    n = len(technique1)
    
    # Step 1: Create array of (difference, index) for sorting
    # difference = technique1[i] - technique2[i]
    differences = []
    for i in range(n):
        diff = technique1[i] - technique2[i]
        differences.append((diff, i))
    
    # Step 2: Sort by difference in descending order
    # Higher differences first (better candidates for technique1)
    differences.sort(reverse=True)
    
    # Step 3: Initialize total points with technique2 for all tasks
    total_points = sum(technique2)
    
    # Step 4: We must pick k tasks using technique1
    # Pick the top k by difference (least costly switch from technique2 to technique1)
    for i in range(k):
        idx = differences[i][1]
        diff = differences[i][0]
        # Switch from technique2 to technique1
        total_points += diff
    
    # Step 5: For remaining n-k tasks, pick technique1 only if positive difference
    for i in range(k, n):
        diff = differences[i][0]
        # Only switch if technique1 is better (diff > 0)
        if diff > 0:
            total_points += diff
    
    return total_points
```

## Time and Space Complexity Analysis

- **Time Complexity:** O(n log n)
  - Creating differences array: O(n)
  - Sorting by difference: O(n log n)
  - Two passes through the sorted array: O(n)
  - Dominant term is sorting

- **Space Complexity:** O(n)
  - Differences array stores n elements (indices and values)
  - Sorting typically uses O(log n) recursion stack for quicksort/mergesort, but space for the array itself is O(n)

## Potential follow-up questions

- (Follow-up question 1) What if we can choose k tasks to maximize points, where we can use any combination of techniques (no minimum k constraint)?
  *Hint: Think about how removing the "at least k" constraint simplifies the problem. Would greedy still work?*

- (Follow-up question 2) What if technique 1 has a cost (e.g., you pay C for each task using technique 1)? How would you adjust the approach?
  *Hint: Modify the difference calculation to account for the cost. The rest of the greedy strategy remains similar.*

- (Follow-up question 3) What if there's a dependency constraint where completing task A with technique 1 unlocks a bonus for task B?
  *Hint: This breaks greedy. Consider dynamic programming with state tracking which tasks have been completed and their dependencies.*

## Summary

The key pattern here is **greedy selection with sorting by relative gain**. By calculating the difference between two choices and sorting by this difference, we can greedily satisfy a minimum constraint (at least k) while maximizing total benefit. This is common in resource allocation problems where you must allocate a minimum to one option but want to optimize overall value. The pattern applies to problems like task scheduling, stock trading with constraints, and weighted job selection.

## Flashcard

Use greedy sorting by technique1[i] − technique2[i] to select the k least-costly tasks for technique 1, then greedily pick technique 1 for remaining tasks only if their difference is positive. This satisfies the k constraint while maximizing total points in O(n log n) time.


### Flashcard
Use DP where dp[i][j] = max points using first i tasks with exactly j using technique 1 (≥K enforced by max over j≥K).

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
