### Leetcode 1394 (Easy): Find Lucky Integer in an Array [Practice](https://leetcode.com/problems/find-lucky-integer-in-an-array)

### Description  
Given an array of integers, a **lucky integer** is an integer whose value equals its frequency in the array.  
Return the **largest lucky integer** if there is at least one; otherwise, return -1.  
For example, if an integer appears `k` times and `k == value`, then it is a lucky integer.

### Examples  

**Example 1:**  
Input: `[2,2,3,4]`  
Output: `2`  
*Explanation: 2 appears exactly 2 times (frequency 2), matching its value. Only 2 is lucky in this case.*

**Example 2:**  
Input: `[1,2,2,3,3,3]`  
Output: `3`  
*Explanation: 1 appears once, 2 appears 2 times, and 3 appears 3 times. All are "lucky", return the largest: 3.*

**Example 3:**  
Input: `[2,2,2,3,3]`  
Output: `-1`  
*Explanation: 2 appears 3 times (not equal to 2), 3 appears 2 times (not equal to 3). No "lucky" integers, return -1.*

### Thought Process (as if you’re the interviewee)  
To solve this, I need to find the frequency of each unique element in the array, then check for each number if its frequency equals its value.

- The brute-force approach would be: for each number, count its frequency by iterating through the array, which is O(n²).
- Instead, to get O(n) time, I can use a frequency array or dictionary as a counting mechanism, since all values fit within a small range (1...500).
- After calculating frequencies, iterate through the counted keys and check which numbers are "lucky", keeping track of the largest found.
- The space trade-off is a simple frequency structure proportional to the range of possible values (which is fixed and small).

This approach is efficient and readable given the constraints.

### Corner cases to consider  
- Empty array: should return -1.
- All elements unique, but no lucky (e.g., [5,6,7]).
- All elements the same and value matches frequency (e.g., [4,4,4,4]).
- Large values (but ≤ 500), since constraints specify possible range.
- Input [1]: single value, should return 1.
- No lucky, e.g., [2,2,2] or [5,5]
- Multiple lucky numbers, must pick the largest one.

### Solution

```python
def findLucky(arr):
    # Array is small and element values are up to 500, so we use a fixed-size frequency array.
    freq = [0] * 501  # Indices: 0 to 500
    
    # Count the frequency of every number in arr
    for num in arr:
        freq[num] += 1
    
    # Look for the largest number whose frequency equals its value
    # Search from high to low to exit early on the largest
    for val in range(500, 0, -1):
        if freq[val] == val:
            return val
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — single pass to count elements, then a constant pass over at most 500 possible values.
- **Space Complexity:** O(1) — frequency storage is always 501 integers, independent of input size (n ≤ 500).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array had possible values far greater than 500?
  *Hint: Think about using a hash map/dictionary instead of a fixed-size array.*
- How would you solve it if you could only modify the array in-place and not use extra memory?
  *Hint: Sorting the array may help group similar values together for frequency counting.*
- Can you find the k-th largest lucky integer if multiple exist?
  *Hint: Collect all lucky integers, sort them, and select the k-th largest.*

### Summary
The problem leverages the **frequency counting pattern**—useful when you need to relate/count element occurrences in an array quickly. Here, value constraints allow a simple fixed-size array, but for unbounded or large value ranges, a hash map would be the general solution. This approach appears in problems relating to "majority elements", "modes", or "frequencies matching a property". The key pattern is count, scan, then filter on the count.

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
