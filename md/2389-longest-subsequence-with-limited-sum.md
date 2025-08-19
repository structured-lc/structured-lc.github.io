### Leetcode 2389 (Easy): Longest Subsequence With Limited Sum [Practice](https://leetcode.com/problems/longest-subsequence-with-limited-sum)

### Description  
Given two integer arrays, **nums** and **queries**:  
For each element q in queries, return the maximum length of a subsequence from nums whose sum is ≤ q.  
A **subsequence** is any sequence derived from the original array by deleting some or no elements, without changing the order of the rest.  
Your task is to maximize the size (number of elements) of the subsequence while keeping the sum ≤ query value.

### Examples  

**Example 1:**  
Input: `nums = [4,5,2,1]`, `queries = [3,10,21]`  
Output: `[1,3,4]`  
*Explanation: For query 3, only [1] fits (sum=1). For 10, the largest possible is [1,2,4] (sum=7). For 21, you can take the whole array (sum=12).*

**Example 2:**  
Input: `nums = [2,3,4,5]`, `queries = [1,2,3,4,5]`  
Output: `[0,1,1,1,2]`  
*Explanation: For 1, nothing fits. For 2, [2]. For 3, again just [2]. For 4, just [2]. For 5, [2,3] = 5.*

**Example 3:**  
Input: `nums = [7,3,1]`, `queries = [4,8,10]`  
Output: `[1,2,2]`  
*Explanation: For 4, [1]. For 8, [1,3]. For 10, [1,3]. 7 alone would use up most of the sum and does not allow for a longer subsequence.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force Idea:**  
  Try all possible subsequences for each query, calculate their sums, and return the largest size that fits.  
  But the number of subsequences is 2ⁿ, which is infeasible for n up to 1000.
- **Observation:**  
  To maximize subsequence length while still being ≤ target sum, always pick the **smallest possible elements first**.  
- **Approach:**  
  1. Sort nums in ascending order.
  2. Compute the prefix sum array.
  3. For each query, use binary search over prefix sums to find the maximum number of elements whose total sum is ≤ query.
- **Trade-offs:**  
  - Sorting and prefix sum setup is O(n log n).
  - For m queries, each search is O(log n), so total time is O(n log n + m log n), which is highly efficient.

### Corner cases to consider  
- nums is empty.
- queries are empty.
- All nums are larger than every query.
- All queries are very large (entire nums sum ≤ every query).
- Duplicates in nums.
- Single element in nums or queries.

### Solution

```python
def answerQueries(nums, queries):
    # Sort nums to get smallest elements first for longest subsequence
    nums.sort()

    # Compute prefix sums: prefix[i] = sum of nums[0] to nums[i-1]
    prefix = [0]
    for num in nums:
        prefix.append(prefix[-1] + num)

    res = []
    # For each query, use binary search to maximize the number of nums that fit
    for q in queries:
        left, right = 0, len(nums)
        while left < right:
            mid = (left + right + 1) // 2  # upper mid to avoid infinite loop
            if prefix[mid] <= q:
                left = mid
            else:
                right = mid - 1
        res.append(left)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n) for sorting nums, plus O(m log n) for m queries (each is binary search over at most n elements).  
  Overall: **O((n + m) log n)**
- **Space Complexity:**  
  O(n) for prefix sum array and O(m) result array. No extra space beyond inputs and small storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this problem if you could not sort nums (i.e., had to preserve its order)?  
  *Hint: Consider dynamic programming with original ordering.*

- Can you design a solution if queries were presented one at a time, and nums was being updated/changed frequently?  
  *Hint: Think about segment trees or data structures supporting efficient range sum queries with updates.*

- What if you had to return the actual subsequence itself and not just the maximum length?  
  *Hint: Use indices tracked during prefix sum construction.*

### Summary
This problem uses a **Sorting + Prefix Sum + Binary Search** pattern, which is a common and powerful combination for maximizing counts under a budget/constraint (“largest k such that sum ≤ target”). This approach can be applied in other problems where we want as many elements as possible while obeying some overall constraint—classic for array and greedy optimization techniques.

### Tags
Array(#array), Binary Search(#binary-search), Greedy(#greedy), Sorting(#sorting), Prefix Sum(#prefix-sum)

### Similar Problems
- How Many Numbers Are Smaller Than the Current Number(how-many-numbers-are-smaller-than-the-current-number) (Easy)
- Successful Pairs of Spells and Potions(successful-pairs-of-spells-and-potions) (Medium)