### Leetcode 3763 (Medium): Maximum Total Sum with Threshold Constraints [Practice](https://leetcode.com/problems/maximum-total-sum-with-threshold-constraints)

### Description  
You are given two 0-indexed integer arrays nums and threshold of equal length n. Start with step = 1 and a total sum = 0. In each step, check if there exists any index i where threshold[i] ≤ step. If yes, select the index i with the maximum nums[i] among all such valid indices, add nums[i] to the total sum, and remove that index i from consideration. Increment step by 1 and repeat. The process ends when no index i satisfies threshold[i] ≤ step. Return the maximum total sum achieved.

### Examples  

**Example 1:**  
Input: `nums = [5,2,7,4], threshold = [1,3,1,2]`  
Output: `14`  
*Explanation: step=1: valid indices 0,2 (thresholds 1,1); pick max nums[2]=7, sum=7.  
step=2: valid indices 0,3 (thresholds 1,2); pick max nums=5, sum=12.  
step=3: valid index 1 (threshold 3); pick nums[1]=2, sum=14.  
No more valid indices, return 14.*

**Example 2:**  
Input: `nums = [3,1,2], threshold = [2,1,1]`  
Output: `5`  
*Explanation: step=1: valid indices 1,2 (thresholds 1,1); pick max nums[1]=1? Wait, nums[2]=2 > nums[1]=1, pick 2, sum=2.  
step=2: valid indices 0,1 (thresholds 2,1); pick max nums=3, sum=5.  
No more, return 5.*

**Example 3:**  
Input: `nums = [1], threshold = [3]`  
Output: `0`  
*Explanation: step=1: no index with threshold ≤1. Process ends immediately, return 0.*

### Thought Process (as if you’re the interviewee)  
First, brute-force: for each step starting from 1, scan all remaining indices to find those with threshold[i] ≤ step, pick the max nums[i], add it, remove it, repeat until no valid indices. This is O(n²) since each step scans up to n indices, too slow for n=10⁵.  

To optimize, notice we process greedily: at each step, always pick the largest nums[i] among those "unlocked" by current step (threshold[i] ≤ step), using each index once. Sort pairs (threshold[i], nums[i]) by threshold ascending, then nums descending. This groups low-threshold items first, and within same threshold, prioritizes high nums. Then iterate step=1,2,... and for each step, scan the sorted list from left, picking the first (earliest in sort) unused item where threshold ≤ step (which will be the highest nums possible due to sort order), mark as used, add to sum. Since sorted, we process in optimal order without rescanning everything.  

Trade-offs: Sorting is O(n log n), then linear scan over n steps picking at most n items, total O(n log n + n) = O(n log n), efficient. Using a heap/priority queue could work but sorting is simpler here without needing extracts.

### Corner cases to consider  
- n=1: Either pick if threshold ≤1, or return 0 if threshold >1.  
- All thresholds >1: Return 0 immediately.  
- All thresholds =1: Pick all nums in descending order (due to sort), sum = total sum.  
- Duplicate thresholds: Sort ensures same-threshold picks highest nums first.  
- nums with negatives/zeros: Still pick if valid (maximizes sum).  
- Large n=10⁵: Must be O(n log n) or better.

### Solution

```python
def maximumTotalSum(nums: list[int], threshold: list[int]) -> int:
    # Pair nums[i] with threshold[i], sort by threshold asc, then nums desc
    # (smaller threshold first, ties broken by larger nums first for greedy pick)
    pairs = sorted([(threshold[i], nums[i]) for i in range(len(nums))], 
                   key=lambda x: (x[0], -x[1]))
    
    total = 0
    used = [False] * len(pairs)  # Track used indices in sorted list
    step = 1
    
    while True:
        found = False
        # Scan sorted list from left (smallest threshold first)
        for j in range(len(pairs)):
            if not used[j] and pairs[j][0] <= step:
                # Pick this: highest nums among valid due to sort order
                total += pairs[j][1]
                used[j] = True
                found = True
                break
        
        if not found:
            return total
        step += 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sorting pairs, then O(n²) worst-case scan? No, each index used once, and we scan sequentially; but actually since we break after first pick per step, and at most n steps/picks, total scans amortized O(n) post-sort. Overall O(n log n).  
- **Space Complexity:** O(n) for pairs list and used array.

### Potential follow-up questions (as if you’re the interviewer)  

- (What if we must pick exactly k items if possible, or handle multiple picks per step?)  
  *Hint: Modify to track pick count per step, or use segment tree for range max queries on thresholds.*

- (What if nums can be negative and we can skip some even if valid?)  
  *Hint: Only pick if nums[i] > 0, adjust greedy to threshold-only sort.*

- (Extend to 2D: multiple groups with shared step?)  
  *Hint: Multi-pointer or merge sorted lists per group.*

### Summary
Greedy with custom sort on (threshold asc, nums desc) pairs allows sequential picking of optimal nums unlocked by each step. Common pattern in threshold/step-limited greedy (e.g., activity selection variants, scheduling).

### Flashcard
Sort pairs by threshold ascending then nums descending; for each step=1++, pick first unused pair with threshold ≤ step for max nums greedily.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
