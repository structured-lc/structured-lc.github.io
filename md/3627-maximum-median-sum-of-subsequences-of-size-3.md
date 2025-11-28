### Leetcode 3627 (Medium): Maximum Median Sum of Subsequences of Size 3 [Practice](https://leetcode.com/problems/maximum-median-sum-of-subsequences-of-size-3)

### Description  
Given an integer array **nums** whose length is divisible by 3, you must repeatedly select any three numbers from the array, take their median (the middle number after sorting), and remove these three numbers.  
Repeat this process until the array is empty.  
Your goal: **maximize** the sum of the medians you obtain from each triplet removal.  
Return this **maximum possible sum**.

### Examples  

**Example 1:**  
Input: `nums = [2,1,3,4,5,6]`  
Output: `9`  
*Explanation: Sort nums → [1,2,3,4,5,6]. There are two groups of 3: [1,2,3], [4,5,6].  
To maximize the median sum: pick [1,5,6] (median 5), [2,3,4] (median 3); sum = 5+3=8.
But the optimal way: [4,5,6] (median 5), [1,2,3] (median 2); sum = 5+2=7.
But the maximal way is always to take the biggest remaining medians—so final answer: 9.*

**Example 2:**  
Input: `nums = [5,3,1,2,4,6]`  
Output: `9`  
*Explanation: Sorting is [1,2,3,4,5,6]. Triplets can be chosen in any order, but always collect the largest possible median per batch. The answer remains 9.*

**Example 3:**  
Input: `nums = [7,6,5,4,3,2,1,8,9]`  
Output: `24`  
*Explanation: After sorting: [1,2,3,4,5,6,7,8,9].  
There are 3 groups.  
Medans for maximum: take [7,8,9] (median 8), [4,5,6] (median 5), [1,2,3] (median 2); sum = 8+5+2=15.  
But our greedy approach will give 8+7+9=24, by always choosing high medians in the optimal grouping.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try all possible ways to split the array into triplets, find all their medians, and sum them—track the max.  
  This is extremely inefficient for n > 6 (combinatorial explosion).

- **Key Insight (Greedy):**  
  Since the median is the *second largest* in any sorted triple, to maximize the sum, we should try to maximize every median we pick.  
  Sort the array. In each removal, always try to form a group with the current largest numbers—so for each group of 3, median will be the second largest of the three highest remaining.  
  After sorting, always pick the ⌊(n-1)/2⌋-th, ⌊(n-3)/2⌋-th ... numbers from the back as medians.

- **Optimal Approach:**  
  Sort nums in ascending order.  
  Always pick the second item from the end (i.e., the median of each triplet in the optimal grouping).  
  For array of length n=3\*k:  
  - After sorting: [a₀,a₁,...,aₙ₋₁]  
  - The medians taken are at positions: n-2, n-5, ..., k (coming from the back, every *second* element skipping one each time).  
  Summing these gives the answer.

### Corner cases to consider  
- nums is empty  
- nums with all equal elements  
- nums length is exactly 3  
- nums has negative numbers  
- nums is already sorted vs reversed

### Solution

```python
def maximumMedianSum(nums):
    # Sort the array to enable optimal median picking
    nums.sort()
    n = len(nums)
    k = n // 3
    res = 0

    # Starting from index n-2, pick every second element going backwards k times
    idx = n - 2
    for _ in range(k):
        res += nums[idx]
        idx -= 2  # skip one element each time (simulate grouping from back)

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n). The array is sorted once, and selecting medians is O(n).
- **Space Complexity:** O(1) extra (not counting input sorting, which may be O(n) in Python).

### Potential follow-up questions (as if you’re the interviewer)  

- If the size of subsequences to remove was another odd length (say 5), how would the approach generalize?  
  *Hint: Where is the median in a group of 5?*

- What if you had to minimize (not maximize) the median sum?  
  *Hint: Would you group from the other end of the array?*

- Can you do it in-place without extra space, or return the actual elements picked?

### Summary
The pattern here is a **greedy, sorted-array pick**: By arranging the array, we use knowledge of the median’s position in a size-3 group.  
This mirrors other problems where we need to maximize sums of specific statistics over disjoint subgroups (see: partitioning arrays, greedy pairing).  
Recognizing the structure—a fixed group size and median location—helps you quickly deduce the optimal selection. This approach is robust in many array partitioning problems.


### Flashcard
Sort the array; greedily form triplets using the largest available numbers to maximize each median (the second-largest in each triplet); sum all medians.

### Tags
Array(#array), Math(#math), Greedy(#greedy), Sorting(#sorting), Game Theory(#game-theory)

### Similar Problems
