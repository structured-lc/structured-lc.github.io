### Leetcode 1775 (Medium): Equal Sum Arrays With Minimum Number of Operations [Practice](https://leetcode.com/problems/equal-sum-arrays-with-minimum-number-of-operations)

### Description  
Given two arrays **nums1** and **nums2**, each containing integers in the range 1 to 6, your task is to make the sums of the two arrays equal using the **minimum number of operations**. In a single operation, you can change any element of either array to any value between 1 and 6 (inclusive). Return the minimum number of operations needed. If it’s impossible, return -1.

### Examples  

**Example 1:**  
Input: `nums1 = [1,2,3,4,5,6]`, `nums2 = [1,1,2,2,2,2]`  
Output: `3`  
Explanation:  
Operations:  
- Change 6 → 1 in nums1: nums1 = [1,2,3,4,5,1] (sum decreases by 5)  
- Change 5 → 1 in nums1: nums1 = [1,2,3,4,1,1] (sum decreases by 4)  
- Change 4 → 1 in nums1: nums1 = [1,2,3,1,1,1] (sum decreases by 3)  
Total decreased = 12, which balances the sums.

**Example 2:**  
Input: `nums1 = [1,1,1,1,1,1,1]`, `nums2 = `  
Output: `-1`  
Explanation:  
nums1 has 7 elements of 1, so min possible sum = 7, max for nums2 = 6. It's impossible for both to be equal.

**Example 3:**  
Input: `nums1 = [6,6]`, `nums2 = [1]`  
Output: `1`  
Explanation:  
Change 1 → 6 in nums2: nums2 = , sums equal. Only 1 operation needed.

### Thought Process (as if you’re the interviewee)  
First, compare the sums of the arrays. If they are already equal, zero operations are required.

The brute-force idea is to try each move for every index in both arrays, recalculating the sum every time—which is not feasible given the input constraints.

Instead, optimize by:
- Observing that in one step, you can *decrease* a number in the higher-sum array to 1 (maximum decrease), or *increase* a number in the lower-sum array to 6 (maximum increase). Each possible move has a "gain" value.
- Greedily choose the moves offering the largest possible gain at each step, repeating until the sums balance or moves are exhausted.

Steps:
1. If it’s impossible (i.e., min possible sum of one array > max possible sum of the other), return -1.
2. Calculate the sum difference.
3. For both arrays, determine all possible "step gains":  
   - For the array with a higher sum, for each number, usable gain = value - 1  
   - For the array with a lower sum, for each number, usable gain = 6 - value
4. Aggregate all gains, sort descending.
5. Use the fewest moves from the largest available gains to cover the sum difference.

This greedy approach is efficient, since it focuses on the maximum-effective moves at each step.

### Corner cases to consider  
- Arrays with extreme sizes (e.g., 1 element vs. 6\*len(other) elements).
- Arrays already equal in sum.
- Every number is either 1 or 6 (minimum or maximum).
- Impossible cases (e.g., the sum ranges never overlap: 1\*len(nums1) > 6\*len(nums2) or vice versa).
- Input arrays are empty (usually not per constraints, but useful to note).
- Both arrays with only one element.

### Solution

```python
def minOperations(nums1, nums2):
    # Early impossibility check: max possible sum in smaller array < min possible sum in larger one
    if len(nums1) * 6 < len(nums2) or len(nums2) * 6 < len(nums1):
        return -1

    sum1, sum2 = sum(nums1), sum(nums2)

    # Always operate to make sum1 <= sum2 for simplicity
    if sum1 > sum2:
        nums1, nums2 = nums2, nums1
        sum1, sum2 = sum2, sum1

    diff = sum2 - sum1
    if diff == 0:
        return 0

    # Collect all possible "gains" for reducing the diff: 
    # For nums1: max you can increase any value = 6 - value
    # For nums2: max you can decrease any value = value - 1
    gains = []
    for x in nums1:
        gains.append(6 - x)
    for x in nums2:
        gains.append(x - 1)

    # Sort gains in descending order
    gains.sort(reverse=True)

    # Apply the largest possible gain steps greedily
    operations = 0
    for g in gains:
        if diff <= 0:
            break
        diff -= g
        operations += 1

    return operations if diff <= 0 else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n) — Aggregating possible gains, plus O((m+n) log (m+n)) for sorting. m, n = lengths of nums1 and nums2.
- **Space Complexity:** O(m + n) — For the gains array storing at most m+n entries.

### Potential follow-up questions (as if you’re the interviewer)  

- What if values are not restricted to [1,6]?  
  *Hint: How would you generalize the calculation of "gain" steps?*

- How would you address the space usage for extremely large input sizes?  
  *Hint: Do you truly need to store every gain? What about using a frequency array for counts 1–5?*

- Can you find the actual set of operations (indices and new values), not just the minimum count?  
  *Hint: Track which elements and their positions you change, instead of just gains.*

### Summary
This problem is a classic greedy pattern: always make the operation with the biggest gain toward your goal. Sorting possible single-step changes (gains) and applying the largest first is optimal. The core pattern applies to other 'minimize operation count to reach target using step-gain set' problems, especially those with finite, small-value domains.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Counting(#counting)

### Similar Problems
- Number of Dice Rolls With Target Sum(number-of-dice-rolls-with-target-sum) (Medium)