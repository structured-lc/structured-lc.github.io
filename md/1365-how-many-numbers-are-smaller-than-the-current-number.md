### Leetcode 1365 (Easy): How Many Numbers Are Smaller Than the Current Number [Practice](https://leetcode.com/problems/how-many-numbers-are-smaller-than-the-current-number)

### Description  
Given an array nums, for each nums[i], count how many numbers in nums are strictly smaller than nums[i]. Return the result as a list.

### Examples  

**Example 1:**  
Input: `nums = [8, 1, 2, 2, 3]`  
Output: `[4, 0, 1, 1, 3]`  
*Explanation: 8 has 4 smaller (1,2,2,3); 1 has 0; 2's have 1 (1); 3 has 3 (1,2,2).*

**Example 2:**  
Input: `nums = [6, 5, 4, 8]`  
Output: `[2, 1, 0, 3]`  
*Explanation: 6:2 (5,4); 5:1 (4); 4:0; 8:3 (6,5,4)*

**Example 3:**  
Input: `nums = [7, 7, 7, 7]`  
Output: `[0, 0, 0, 0]`  
*Explanation: All equal; no number is smaller than any element.*

### Thought Process (as if you’re the interviewee)  
Brute-force: For each nums[i], count all nums[j] < nums[i]. This is O(n²).
Better: Since nums has a limited size and range (0-100), we can count the frequency of each number, then for each nums[i], use prefix sums to quickly get how many are smaller.

### Corner cases to consider  
- All elements same (answer: all zeros)
- nums has one element (answer: )
- nums not sorted
- Duplicates present

### Solution
```python
def smallerNumbersThanCurrent(nums):
    freq = [0] * 101  # Number range 0-100
    for n in nums:
        freq[n] += 1
    # Prefix sums: for each x, total numbers < x = sum(freq[0:x])
    for i in range(1, 101):
        freq[i] += freq[i-1]
    res = []
    for n in nums:
        # If n == 0, none are smaller
        res.append(0 if n == 0 else freq[n-1])
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n + k), n = len(nums), k = 101; all counting and res-building steps
- **Space Complexity:** O(k), for the frequency/prefix sum array

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if nums wasn't limited to a fixed small value range?  
  *Hint: Sort and use value-to-index maps; possible with binary search too.*

- How would you do it in-place (minimize extra array usage)?  
  *Hint: If allowed to sort, can sort with original indices, then fill answers.*

- Can you do it during input stream for very large incoming data?  
  *Hint: Use ordered statistics trees or similar structures for running counts.*

### Summary
This is a frequency counting and prefix sum pattern, common for problems with limited value range. The pattern generalizes to rank queries, counting numbers less than a threshold.


### Flashcard
Count frequency of each number; for each nums[i], use prefix sum to find how many numbers are smaller.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting), Counting Sort(#counting-sort)

### Similar Problems
- Count of Smaller Numbers After Self(count-of-smaller-numbers-after-self) (Hard)
- Longest Subsequence With Limited Sum(longest-subsequence-with-limited-sum) (Easy)