### Leetcode 594 (Easy): Longest Harmonious Subsequence [Practice](https://leetcode.com/problems/longest-harmonious-subsequence)

### Description  
Given an integer array, find the length of its **longest harmonious subsequence**.  
A harmonious subsequence is defined as a subsequence where the **difference between its maximum and minimum value is exactly 1**.  
A subsequence can be formed by removing zero or more elements without changing the order of the remaining elements.

### Examples  

**Example 1:**  
Input: `nums = [1,3,2,2,5,2,3,7]`  
Output: `5`  
*Explanation: The subsequence `[3,2,2,2,3]` has min=2, max=3, and length 5. (Difference = 1, which is harmonious.)*

**Example 2:**  
Input: `nums = [1,2,3,4]`  
Output: `2`  
*Explanation: `[1,2]`, `[2,3]`, or `[3,4]` are harmonious subsequences, each with length 2. Only two distinct consecutive numbers appear together.*

**Example 3:**  
Input: `nums = [1,1,1,1]`  
Output: `0`  
*Explanation: All elements are 1, so the max - min = 0. No harmonious subsequence exists.*

### Thought Process (as if you’re the interviewee)  
First, consider brute force: generate all possible subsequences and check if their max - min = 1, then take the longest.  
But this approach is exponential and not feasible for realistic input sizes.

Instead, I notice that to form a harmonious subsequence, I only need to pick all occurrences of two numbers `x` and `x+1` (or `x-1`), since the max and min differ by exactly 1.  
So I can:
- Count the frequencies of all elements.
- For each unique number x, if x+1 exists, combine counts of x and x+1 for possible subsequences.
- Return the maximum such sum.

This is optimal (O(n) time, O(n) space) and avoids generating actual subsequences.

### Corner cases to consider  
- Empty array (`[]`) → return 0.
- All elements equal (e.g. `[5,5,5]`) → output 0.
- Array with only one element → 0.
- No two elements with difference 1 (e.g. `[1,3,5,7]`) → 0.
- Many elements with the same two values (e.g. `[2,2,3,3,3,2,3]`) → largest possible subset.

### Solution

```python
def findLHS(nums):
    # Create a hash map to store each number's frequency
    freq = {}
    for num in nums:
        if num not in freq:
            freq[num] = 0
        freq[num] += 1
    
    max_len = 0
    # For each number, check if there exists num + 1
    for num in freq:
        if num + 1 in freq:
            curr_len = freq[num] + freq[num + 1]
            if curr_len > max_len:
                max_len = curr_len
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input array.  
  One pass to build the frequency dictionary, then another pass over the unique numbers (bounded by n) to check for harmonious pairs.
- **Space Complexity:** O(n), for storing the counts of each unique number in a hash map.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return the actual subsequence as well?  
  *Hint: Keep track of indices or reconstruct the subsequence after identifying the values.*

- How would you modify the solution to handle streaming data or huge files?  
  *Hint: Use a rolling hash map or sliding window, process buffer at a time.*

- Can you extend the definition to allow (max-min)=k for some given k?  
  *Hint: For each num, look for num+k instead of just num+1.*

### Summary
The approach uses a classic **hash map counting pattern**, grouping by value and combining counts of number pairs whose values differ by one.  
This pattern is widely used for "frequency" or "pair difference" problems.  
Knowing how to apply hash maps for such counting/aggregation helps in many LeetCode array/sequence questions.

### Tags
Array(#array), Hash Table(#hash-table), Sliding Window(#sliding-window), Sorting(#sorting), Counting(#counting)

### Similar Problems
