### Leetcode 1224 (Hard): Maximum Equal Frequency [Practice](https://leetcode.com/problems/maximum-equal-frequency)

### Description  
Given an array of positive integers, find the length of the longest prefix such that after removing exactly one element from this prefix, every number in the prefix occurs the same number of times.  
You need to report the largest prefix for which this property holds.

### Examples  

**Example 1:**  
Input: `[2,2,1,1,5,3,3,5]`  
Output: `7`  
Explanation:  
For the subarray `[2,2,1,1,5,3,3]` (prefix of length 7), remove the `5` at index 4 to get `[2,2,1,1,3,3]`, which has each number appearing exactly twice.

**Example 2:**  
Input: `[1,1,1,2,2,2,3,3,3,4,4,4,5]`  
Output: `13`  
Explanation:  
The full array of length 13 works. Remove the `5` at index 12, and all other numbers appear exactly 3 times.

**Example 3:**  
Input: `[1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,5]`  
Output: `15`  
Explanation:  
For the prefix `[1,1,1,2,2,2,3,3,3,4,4,4,5,5,5]` (first 15 elements), remove any one of the 5s, and all numbers appear exactly 3 times.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**:  
  For each prefix, try removing each element and check if the remaining numbers all occur the same number of times. This would involve checking O(N²) prefixes, and inside each, rebuilding the frequency map and checking O(N) removals.  
  This is clearly too slow for large N (up to 10⁵).

- **Optimized approach**:  
  Keep track, as we scan the array, of how many times we've seen each number (count per number), and how many numbers have each frequency (frequency of frequencies).  
  For each prefix, check if by removing one element, the remaining frequencies can all be made equal.  
  There are only a few possible cases where this is true:
  - All numbers have occurred once.
  - All have the same frequency except one: either one value has frequency 1 or one value has a frequency that's greater by 1 compared to others.
  So, as we iterate, we track:
  - `count[num]`: the count of each num seen so far.
  - `freq[count]`: the number of numbers having a count of `count`.
  - `maxFreq`: the highest frequency so far.
  After each step, we check:
  - If `maxFreq == 1`, then all elements are unique.
  - Or, if `maxFreq * freq[maxFreq] + freq[maxFreq - 1] * (maxFreq - 1) == i` and `freq[maxFreq] == 1`.
  - Or, if `maxFreq * freq[maxFreq] + 1 == i` and `freq[1] == 1`.
  These correspond to the cases where removing one element makes the frequencies balanced.

- **Trade-offs**:  
  The optimized approach increases code complexity but runs in O(N) time and space.

### Corner cases to consider  
- All elements are the same (e.g., `[1,1,1,1]`)
- All elements unique (e.g., `[1,2,3,4]`)
- Remove at the end vs. middle
- Minimum input size (1 element)
- Already balanced before the last element is added

### Solution

```python
def maxEqualFreq(nums):
    # Track number -> frequency
    count = {}
    # Track frequency -> number of numbers with that freq
    freq = {}
    maxFreq = 0
    res = 0

    for i, num in enumerate(nums):
        prev = count.get(num, 0)
        if prev > 0:
            freq[prev] -= 1
            if freq[prev] == 0:
                del freq[prev]
        count[num] = prev + 1
        curr = count[num]
        freq[curr] = freq.get(curr, 0) + 1
        maxFreq = max(maxFreq, curr)

        n = i + 1
        # 1) All numbers have frequency 1
        if maxFreq == 1:
            res = n
        # 2) One number has frequency 1, all others have maxFreq
        elif freq.get(1, 0) == 1 and freq[maxFreq] * maxFreq + 1 == n:
            res = n
        # 3) One number has frequency maxFreq, all others have maxFreq - 1
        elif freq.get(maxFreq, 0) == 1 and (freq.get(maxFreq - 1, 0) * (maxFreq - 1) + maxFreq == n):
            res = n
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the input array. Each prefix is processed in constant time because updating counts and checking conditions use hash maps.
- **Space Complexity:** O(n) in the worst case, due to the storage for two hash maps: one for number counts, and one for frequencies.

### Potential follow-up questions (as if you’re the interviewer)  

- What if removal is allowed anywhere (not just prefixes)?
  *Hint: Try to generalize the logic to subarrays or arbitrary deletions—much harder.*
- How to report the actual prefix or indices to remove, not just the length?
  *Hint: Keep extra bookkeeping while processing to track candidates.*
- What if the maximum number of deletions allowed is two instead of one?
  *Hint: Generalize and re-derive the frequency cases.*

### Summary
This solution uses the "count of counts" pattern (sometimes called frequency-of-frequency) to enable rapid checking of potential balance-conditions after one removal in a prefix, in O(1) at each step. This approach can also be applied to other problems requiring frequency balancing, such as validating strings for identical character counts after limited changes. It's a classic example of frequency map and hash map usage in arrays.


### Flashcard
Track both the count of each number and the count of each frequency; after each step, check if removing one element could make all frequencies equal.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
- Remove Letter To Equalize Frequency(remove-letter-to-equalize-frequency) (Easy)
- Count Submatrices With Equal Frequency of X and Y(count-submatrices-with-equal-frequency-of-x-and-y) (Medium)