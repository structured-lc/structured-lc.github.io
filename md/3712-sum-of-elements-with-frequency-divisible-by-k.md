### Leetcode 3712 (Easy): Sum of Elements With Frequency Divisible by K [Practice](https://leetcode.com/problems/sum-of-elements-with-frequency-divisible-by-k)

### Description  
Given an integer array `nums` and an integer `k`, return the sum of all elements in `nums` whose frequency (the count of how many times they appear) is divisible by `k`. If no such element exists, return `0`. Frequency divisibility means, for each distinct element, if the number of times it occurs is divisible by `k`, then include the sum of all its occurrences in the result.

### Examples  

**Example 1:**  
Input: `nums = [1,2,2,3,3,3,3,4], k = 2`  
Output: `16`  
*Explanation:  
- Frequency of 1 = 1 (not divisible by 2, ignore)  
- Frequency of 2 = 2 (divisible by 2, include both: 2+2=4)  
- Frequency of 3 = 4 (divisible by 2, include all: 3+3+3+3=12)  
- Frequency of 4 = 1 (not divisible by 2, ignore)  
Sum = 4 + 12 = 16*

**Example 2:**  
Input: `nums = [1,1,2,2,2,3], k = 3`  
Output: `6`  
*Explanation:  
- Frequency of 1 = 2 (not divisible by 3)  
- Frequency of 2 = 3 (divisible by 3, include all: 2+2+2=6)  
- Frequency of 3 = 1 (not divisible by 3)  
Sum = 6*

**Example 3:**  
Input: `nums = [7,7,8,8,9], k = 4`  
Output: `0`  
*Explanation:  
- Frequency of 7 = 2 (not divisible by 4)  
- Frequency of 8 = 2 (not divisible by 4)  
- Frequency of 9 = 1 (not divisible by 4)  
No element has frequency divisible by 4, so output is 0.*

### Thought Process (as if you’re the interviewee)  
- First, count the frequency of each element in `nums`, which is best done using a hashmap/dictionary.
- For each unique element, check if its frequency is divisible by `k`. If yes, add all its occurrences to the answer — that’s frequency × element value.
- If no such element exists, return 0.
- This can be done in two passes: first to count, then to sum.  
- Since array values and possible frequencies are both small (by constraints), this is efficient.

### Corner cases to consider  
- Empty array (should return 0)  
- All frequencies not divisible by `k` (should return 0)  
- `k = 1` (every element qualifies)  
- All numbers same  
- Only one element in array  
- Negative or zero values (check constraints — all nums usually ≥ 1)

### Solution

```python
def sum_elements_with_freq_divisible_by_k(nums, k):
    # Step 1: Build frequency map
    freq_map = {}
    for num in nums:
        if num in freq_map:
            freq_map[num] += 1
        else:
            freq_map[num] = 1

    # Step 2: For each unique element, check if frequency is divisible by k
    result = 0
    for num, freq in freq_map.items():
        if freq % k == 0:
            # If freq is divisible by k, add freq × num to result
            result += freq * num

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of `nums`.  
  We iterate once to build the frequency map, and once over the keys to sum the valid elements.
- **Space Complexity:** O(u), where u is the number of unique elements in `nums` (the size of freq_map).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if you couldn’t use extra space for the frequency map?  
  *Hint: Sort the array and count frequencies in place.*

- What if `nums` can be very large, but the range of element values is small?  
  *Hint: Use an array as a frequency counter instead of a hashmap.*

- How would you return the list of qualifying elements instead of their sum?  
  *Hint: Instead of adding freq × num to result, collect those elements or their indices.*

### Summary
This problem uses the familiar counting/hash map pattern to count frequencies, and then a simple filtering and aggregation step. It’s typical in interview settings for problems related to bucket-counting, frequency analysis, or histograms, and the approach is applicable for problems involving frequency-based selection or filtering in arrays.

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
