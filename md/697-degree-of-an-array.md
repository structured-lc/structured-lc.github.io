### Leetcode 697 (Easy): Degree of an Array [Practice](https://leetcode.com/problems/degree-of-an-array)

### Description  
Given a non-empty array of non-negative integers, the **degree** of the array is defined as the maximum frequency (count) of any of its elements. Your task is to find the **length of the smallest contiguous subarray** that has the same degree as the entire array.  
In other words, among all subarrays that contain all occurrences of the array’s most frequent value(s), return the shortest possible length.

### Examples  

**Example 1:**  
Input: `[1,2,2,3,1]`  
Output: `2`  
*Explanation: The degree is 2 (both 1 and 2 appear twice). The shortest subarrays containing two 2s are `[2,2]` (positions 1-2) and containing two 1s are `[1,2,2,3,1]` (positions 0-4, length 5). The minimum length is 2.*

**Example 2:**  
Input: `[1,2,2,3,1,4,2]`  
Output: `6`  
*Explanation: The degree is 3 (the number 2 appears three times). The smallest subarray containing all 2s is from position 1 to 6: `[2,2,3,1,4,2]`, length 6.*

**Example 3:**  
Input: `[2,1,1,2,1,3,3,3,1,3,1,3,2]`  
Output: `7`  
*Explanation: The degree is 6 (for 3 and 1). For 1, it appears at positions 1,2,4,8,10,12 (span: 2 to 10, length 9). For 3, positions 5,6,7,9,11 (span: 5 to 11, length 7). Shortest such span is 7.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - For each unique element, check all possible subarrays containing all its occurrences, track the minimum length over all degree-value elements.
  - This approach is far too slow: for n elements, O(n²) time or worse.

- **Optimized:**  
  - First, calculate the degree of the array by counting frequencies for each element.
  - For every element, also record the *first* and *last* index where it occurs.
  - For all elements whose count equals the degree, calculate the length between their first and last occurrence (last - first + 1).
  - Return the minimum such length.

- **Trade-offs:**  
  - The optimized version only needs one or two passes over the input, O(n) time and O(n) space for counting and indexing.  
  - This is preferred for constraints where n can be large.

### Corner cases to consider  
- Single element array: `[4]` → Output: `1`
- All elements the same: `[2,2,2,2]` → Output: `4`
- All unique elements: `[1,2,3,4]` → Output: `1`
- More than one value has the degree
- Subarray spans the whole array for degree
- Values at start/end

### Solution

```python
def findShortestSubArray(nums):
    # Dictionaries to store frequency, first and last occurrence of each number
    count = {}
    first_index = {}
    last_index = {}

    for i, num in enumerate(nums):
        # Update count
        count[num] = count.get(num, 0) + 1
        # Set first index only if not set yet
        if num not in first_index:
            first_index[num] = i
        # Always update last index
        last_index[num] = i

    # Find the degree of the array
    degree = max(count.values())
    min_length = float('inf')
    # Scan for all numbers whose count == degree,
    # Get the subarray length covering all their appearances
    for num in count:
        if count[num] == degree:
            length = last_index[num] - first_index[num] + 1
            if length < min_length:
                min_length = length
    return min_length
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input array.
  - We iterate through nums once to build count, first_index, last_index.
  - Then, we scan over at most n keys of count to find the min length.
- **Space Complexity:** O(n)
  - In the worst case, if all numbers are unique, count, first_index, last_index each hold n entries.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the numbers can be negative or very large?
  *Hint: Use a dictionary, not an array for indexing.*

- Can you do this in a single pass?
  *Hint: Track degree and min_length while iterating, updating as you go.*

- What if you need to output the actual subarray, not just its length?
  *Hint: Store start and end indices, extract nums[start:end+1].*

### Summary
We used the **hashmap counting** approach, a classic pattern for problems requiring frequency analysis and window tracking.  
This strategy is very common:  
- Calculating degrees/frequencies,  
- Finding boundaries (first/last index),  
- And using these for windowing or optimizing subarray spans.  
Hashmaps/dictionaries to track element statistics are central here, and similar patterns occur in problems like Longest Substring with K Distinct Characters, or Minimum Window Substring.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
- Maximum Subarray(maximum-subarray) (Medium)