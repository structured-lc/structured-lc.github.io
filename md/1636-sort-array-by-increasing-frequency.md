### Leetcode 1636 (Easy): Sort Array by Increasing Frequency [Practice](https://leetcode.com/problems/sort-array-by-increasing-frequency)

### Description  
Given an array of integers `nums`, sort it by the frequency of each value: numbers with **lower frequency** come first. If two numbers have the same frequency, sort them by value **in decreasing order**. Return the sorted array.

### Examples  
**Example 1:**  
Input: `nums = [1,1,2,2,2,3]`  
Output: `[3,1,1,2,2,2]`  
*Explanation: 3 appears once, 1 appears twice, 2 appears three times. Frequencies: 3 < 1 < 2. For frequency tie (1 and 3 both appear once), put larger number first.*

**Example 2:**  
Input: `nums = [2,3,1,3,2]`  
Output: `[1,3,3,2,2]`  
*Explanation: 1 occurs once, 3 twice, 2 twice. Sort by increasing frequency; for a tie, 3 > 2, so sort as 1, 3, 3, 2, 2.*

**Example 3:**  
Input: `nums = [-1,1,-6,4,5,-6,1,4,1]`  
Output: `[5,-1,4,4,-6,-6,1,1,1]`  
*Explanation: 5 and -1 appear once, 4 appears twice, -6 appears twice, 1 appears three times. Among those that appear once (5, -1), 5 > -1.*

### Thought Process (as if you’re the interviewee)  
First, tally up frequency counts for each element using a dictionary or Counter. The main idea is to use a custom sort: elements should be ordered by frequency (ascending). If frequencies tie, sort by value (descending). In Python, you can supply a key to `sorted()` that returns a tuple: `(frequency, -num)`, so frequency is the primary sort, and negative value "inverts" the value ordering to descending when frequency ties.

Brute force would be nested loops but that's too slow. Frequency counting is O(n), and sorting with a custom key is O(n log n).

### Corner cases to consider  
- All elements are the same
- Every element is unique
- All negative numbers
- Empty array
- Array contains 0
- Mix of negative and positive with same frequency

### Solution

```python
from collections import Counter

def frequencySort(nums):
    # Count frequency of each number
    freq = Counter(nums)
    # Custom sort by frequency ascending, value descending
    nums.sort(key=lambda x: (freq[x], -x))
    return nums
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n), where n is the number of elements in nums; O(n) for counting, O(n log n) for sorting.
- **Space Complexity:** O(n) for the frequency map and output array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to solve this in-place with O(1) space?
  *Hint: Consider if the given constraints would allow bucket sort or other space-efficient approaches.*

- How would you handle the stream of numbers, i.e., numbers arriving over time?
  *Hint: Think about maintaining real-time frequency data structures.*

- Can you solve it if the number range is very large (not -100...100) and input isn’t small?
  *Hint: Analyze tradeoffs for memory and runtime with different counting approaches.*

### Summary
This problem uses the custom sorting pattern combined with frequency counting. The pattern of custom comparators is frequently found in problems where you sort based on more than value, such as with strings or tuples considering multiple keys. Works well in problems with limited input size and value range.