### Leetcode 1207 (Easy): Unique Number of Occurrences [Practice](https://leetcode.com/problems/unique-number-of-occurrences)

### Description  
Given an array of integers, determine if **the number of occurrences of each value is unique**: in other words, no two different numbers can have the same count. Return `True` if all occurrence counts are different, otherwise return `False`.  
For example, if the array is `[1,2,2,1,1,3]`, the counts are `1:3`, `2:2`, and `3:1` — since all are different, we return `True`[1][2][3].

### Examples  

**Example 1:**  
Input: `[1,2,2,1,1,3]`  
Output: `True`  
*Explanation: 1 occurs 3 times, 2 occurs 2 times, 3 occurs 1 time. All are unique.*

**Example 2:**  
Input: `[1,2]`  
Output: `False`  
*Explanation: 1 occurs once, 2 occurs once. Both have the same frequency, so return False.*

**Example 3:**  
Input: `[-3,0,1,-3,1,1,1,-3,10,0]`  
Output: `True`  
*Explanation: -3 occurs 3 times, 0 occurs 2 times, 1 occurs 4 times, 10 occurs once. All frequencies are distinct.*

### Thought Process (as if you’re the interviewee)  

Start with a brute-force approach:

- **Brute-force:**  
  For each unique number, count its frequency, then for each pair of frequencies, check if any are the same by comparing every pair. This would be O(n²) and is inefficient.

- **Optimized Approach:**  
  - **Step 1:** Count the frequency of every number in the array (using a hash map).
  - **Step 2:** Store all the frequencies in a set to automatically filter out duplicates.
  - **Step 3:** If the number of unique frequencies (size of the set) is equal to the number of unique numbers (size of the map), the occurrence counts are all unique.

I would choose this approach because:
- Just one pass for counting (O(n)), and another pass to check uniqueness (O(k)), with k ≤ n.
- Uses O(n) extra space.

Trade-offs:
- Uses more memory for the hash maps and set, but it's fast and concise.

### Corner cases to consider  
- All elements are the same (e.g., `[2,2,2,2]`)  
- All elements are different (e.g., `[1,2,3,4]`)  
- Some negative and zero values (`[0,0,-1,-1,2]`)  
- Very short input (one or two elements)
- Duplicates leading to non-unique frequencies (e.g., `[1,1,2,2]`)
- Large arrays

### Solution

```python
def uniqueOccurrences(arr):
    # Step 1: Count the occurrences for each value
    freq = {}  # key: number, value: count
    for num in arr:
        if num not in freq:
            freq[num] = 1
        else:
            freq[num] += 1

    # Step 2: Collect all occurrence counts in a set to check uniqueness
    counts = set()
    for count in freq.values():
        if count in counts:
            # This frequency has already appeared; not unique
            return False
        counts.add(count)

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - One pass through the array to count frequencies.
  - Another (short) pass through unique keys (≤ n) to check uniqueness.

- **Space Complexity:** O(n)  
  - In worst case (all numbers unique), map and set both take O(n) space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array is very large (e.g., millions of elements)?  
  *Hint: Can you optimize memory, maybe use integer arrays given known value ranges?*

- What if the values are extremely large or not integers?  
  *Hint: You might have to use a different data structure for mapping frequencies.*

- What if the question asks for which numbers have non-unique occurrences?  
  *Hint: After building the frequency map, reverse map the frequencies.*

### Summary
This is a classic hash map + set pattern — **use a dictionary to count occurrences, and a set to ensure uniqueness**. This approach is common for any "uniqueness of counts" problem and can be applied wherever you must check for unique group sizes, such as finding unique degrees in a graph or uniqueness of row/column frequency in matrix problems.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
