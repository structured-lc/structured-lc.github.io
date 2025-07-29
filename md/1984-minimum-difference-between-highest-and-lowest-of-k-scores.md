### Leetcode 1984 (Easy): Minimum Difference Between Highest and Lowest of K Scores [Practice](https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores)

### Description  
Given an integer array **nums** where each element represents a student's score, and an integer **k**, pick the scores of any **k** students so that the difference between the highest and the lowest of those **k** scores is minimized. Return this **minimum possible difference**.

Put another way: pick any group of **k** scores out of **nums**, compute the difference between the largest and smallest score in that group, and find the smallest possible difference achievable.

### Examples  

**Example 1:**  
Input: `nums = , k = 1`  
Output: `0`  
*Explanation: Only one score to choose, so difference is 0.*

**Example 2:**  
Input: `nums = [9, 4, 1, 7], k = 2`  
Output: `2`  
*Explanation: After sorting = [1, 4, 7, 9]. Possible pairs: (1,4)=3, (4,7)=3, (7,9)=2. So, the minimum difference is 2 (from 7 and 9).*

**Example 3:**  
Input: `nums = [1, 10, 100, 1000], k = 3`  
Output: `99`  
*Explanation: Sorted = [1, 10, 100, 1000]. Consider 3 consecutive numbers: [1,10,100] → diff=99, [10,100,1000] → diff=990. So minimum is 99.*

### Thought Process (as if you’re the interviewee)  
First, brute force: try all combinations of **k** elements, compute their min and max, and track the minimum difference. But this is inefficient: for n elements, there are C(n,k) groups, and that grows quickly for larger n.

Instead, since we're seeking *minimum* difference between max and min of k scores, if we **sort** the array first, then for any segment of length **k** (consecutive values), the max/min difference is minimized — all k elements are as close to each other as possible.

So, after sorting **nums**, slide a window of size k, compute the difference between the first and last elements in each window (`nums[i+k-1] - nums[i]`), and take the minimum across all windows.

This is much more efficient — just O(n log n) for sorting plus O(n) for scanning.

### Corner cases to consider  
- Only one element in array (**k=1**) – answer is always 0.
- **k = length of nums** – we must take the whole array.
- All elements are the same (difference is 0).
- The array may be unsorted.
- **nums** may contain negative numbers.
- Large gaps between scores in unsorted order.

### Solution

```python
def minimumDifference(nums, k):
    # If k == 1, the minimum difference is always 0
    if k == 1:
        return 0

    # Sort scores so that close scores are adjacent
    n = len(nums)
    nums.sort()

    min_diff = float('inf')

    # Slide a window of k elements and compute min difference
    for i in range(n - k + 1):
        diff = nums[i + k - 1] - nums[i]
        if diff < min_diff:
            min_diff = diff

    return min_diff
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), dominated by the sort of the array. The sliding window loop takes O(n).
- **Space Complexity:** O(1) extra space, aside from input array sorting (which may be O(n) depending on the sort implementation), and a few extra variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is extremely large and sorting isn't practical?  
  *Hint: Is there a way to process only relevant parts of the array or use external sorting?*

- Can you solve this problem for a stream of numbers, where you can't keep all elements in memory?  
  *Hint: What data structures can efficiently maintain max/min in a sliding window?*

- Does this approach change if the array can have duplicates or negative numbers?  
  *Hint: Try walking through a small example with duplicates or negatives.*

### Summary
This problem is a **Sorting + Sliding Window** pattern: after sorting, the minimal difference between k scores can be found by scanning windows of length k and checking their endpoints. This pattern — sorting for proximity, then windowing/grouping — applies to many "minimum range" or "maximum-in-group" array problems like "minimize unfairness", "maximize group quality", etc. Sorting often drastically simplifies selection problems involving contiguous subgroups!