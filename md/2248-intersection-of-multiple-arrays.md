### Leetcode 2248 (Easy): Intersection of Multiple Arrays [Practice](https://leetcode.com/problems/intersection-of-multiple-arrays)

### Description  
Given a 2D array **nums**, where each subarray **nums[i]** contains distinct positive integers, find all integers that are present in every subarray. Return the intersection in sorted order.

In other words:  
Given a list of integer lists (arrays), return a sorted array of the integers that appear in **all** the arrays.

### Examples  

**Example 1:**  
Input: `nums = [[3,1,2,4,5],[1,2,3,4],[3,4,5,6]]`  
Output: `[3,4]`  
*Explanation: Only 3 and 4 exist in every subarray. After sorting, output is [3,4].*

**Example 2:**  
Input: `nums = [[1,2,3],[4,5,6]]`  
Output: `[]`  
*Explanation: There is no integer present in both arrays. Output is empty.*

**Example 3:**  
Input: `nums = [[7,8,9]]`  
Output: `[7,8,9]`  
*Explanation: Only one subarray, so all its elements are present in all arrays. Sorted output is [7,8,9].*

### Thought Process (as if you’re the interviewee)  
The brute-force approach is to look at each possible value within some range (1…1000, since elements are said to be positive integers and the problem's constraints usually limit the range), and then check if each value is present in every subarray. However, this would require iterating over all subarrays repeatedly for every candidate.

A better approach uses **counting**:
- Since all values are bounded (1 to 1000), we can count occurrences of each integer across all subarrays.
- If a number appears in all subarrays, its count will be exactly equal to the number of subarrays.
- So, iterate over all subarrays and count the occurrences of each element, then collect numbers with count == number of subarrays.

This is optimal for the given constraints and avoids unnecessary comparisons.

Sorting is required at the end to return results in sorted order.

### Corner cases to consider  
- Only one subarray: output is its sorted copy.
- Some or all subarrays are empty: output is empty.
- No integers are common to all subarrays: output is empty.
- All subarrays have exactly the same elements: output is their sorted copy.
- Elements present in some but not all: those get excluded.

### Solution

```python
from typing import List

def intersection(nums: List[List[int]]) -> List[int]:
    # There are at most 1000 different integers (per problem constraints).
    # Use a count array to store how many times each value appears.
    count = [0] * 1001  # Index 0 is unused
    
    # For each subarray, increment the count for each number found.
    for arr in nums:
        for num in arr:
            count[num] += 1

    n = len(nums)
    result = []
    # If a number's count equals n, it means it appeared in every subarray.
    for num in range(1, 1001):
        if count[num] == n:
            result.append(num)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × L + K log K), where N is the number of subarrays, L is the average length of subarrays, and K is the number of unique possible integers (bounded, ≤1000). Processing each number is O(1), total counting is O(N × L), final scan is O(K), sorting output is O(K log K) if needed (though in this code, since result is built from 1..1000, it's naturally sorted).
- **Space Complexity:** O(K) for the counting array, where K = 1001. The output array result takes up to O(K).

### Potential follow-up questions (as if you’re the interviewer)  

- What if values can be very large (e.g., not bounded below 1000)?  
  *Hint: What data structure can you use for counting unbounded integer values?*

- How would you solve this if you had to process data streaming, and subarrays arrive one by one?  
  *Hint: Can you intersect as you iterate, reducing storage?*

- How to optimize for space if only two subarrays are given?  
  *Hint: Try two-pointer or set intersection for two arrays.*

### Summary
This problem combines **counting** and **intersection** of arrays—core ideas for set-based and frequency-based interview questions. The solution leverages a fixed-size frequency array for efficient counting, a pattern useful whenever working within bounded integer ranges. More generally, array intersection and frequency counting appear in duplicate-element, majority-element, and range-counting problems.


### Flashcard
Count occurrences of each integer across all arrays; those with count equal to the number of arrays are in the intersection.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting), Counting(#counting)

### Similar Problems
- Intersection of Two Arrays(intersection-of-two-arrays) (Easy)
- Intersection of Two Arrays II(intersection-of-two-arrays-ii) (Easy)
- Find Smallest Common Element in All Rows(find-smallest-common-element-in-all-rows) (Medium)
- Intersection of Three Sorted Arrays(intersection-of-three-sorted-arrays) (Easy)
- Find the Difference of Two Arrays(find-the-difference-of-two-arrays) (Easy)