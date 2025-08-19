### Leetcode 2168 (Medium): Unique Substrings With Equal Digit Frequency [Practice](https://leetcode.com/problems/unique-substrings-with-equal-digit-frequency)

### Description  
Given a string `s` consisting of digits ('0'-'9'), return the count of **unique substrings** of `s` where every digit in the substring appears the **same number of times**.  
A substring is a contiguous sequence of characters within the string. The result should only count distinct valid substrings, ignoring duplicates.

### Examples  

**Example 1:**  
Input: `s = "1212"`  
Output: `5`  
Explanation: The valid unique substrings are `"1"`, `"2"`, `"12"`, `"21"`, and `"1212"`.  
For instance, `"12"` appears multiple times as a substring but is counted only once.

**Example 2:**  
Input: `s = "12321"`  
Output: `9`  
Explanation: Valid substrings: `"1"`, `"2"`, `"3"`, `"12"`, `"23"`, `"32"`, `"21"`, `"123"`, `"321"`.

**Example 3:**  
Input: `s = "1122"`  
Output: `4`  
Explanation: Valid substrings are `"1"`, `"2"`, `"11"`, and `"22"`. Duplicates like `"1"` or `"22"` are not double-counted.

### Thought Process (as if you’re the interviewee)  

First, I need to find all **substrings** and count those where **all digits present in the substring occur the same number of times**.  
- **Brute-force idea:** Generate all possible substrings (O(n²)), for each, count digit frequencies (O(k), where k = substring length), check if nonzero frequencies are equal. Store only unique substrings in a set.
  - This is inefficient for checking each substring repeatedly.  
- **Optimization:**  
  - Use a prefix sum array for digit frequencies to quickly compute frequency counts for any \[i, j\] substring in O(1) per digit.
  - For substring `s[i:j]`, for each digit 0-9, freq = presum[j+1][digit] - presum[i][digit].
  - For uniqueness, store substrings that pass the check in a set.

Trade-offs:  
- This approach is O(n²) due to two nested loops for substrings but avoids redundant recalculation with prefix sums.
- Space O(n²) for the set (in the worst case, all substrings are distinct).

### Corner cases to consider  
- Empty string (though constraint: s.length ≥ 1)
- All identical digits (e.g., "1111")
- No valid substrings except single digits (e.g., "123456")
- Edge case: All substrings are valid (e.g., "222")
- Large strings (check efficiency)
- Substrings with leading zeroes

### Solution

```python
def equal_digit_frequency(s: str) -> int:
    n = len(s)
    # Prefix sum for each digit
    presum = [[0] * 10 for _ in range(n + 1)]
    for i, ch in enumerate(s):
        digit = int(ch)
        for d in range(10):
            presum[i + 1][d] = presum[i][d]
        presum[i + 1][digit] += 1

    unique = set()
    # Check each substring s[i:j], inclusive
    for i in range(n):
        for j in range(i, n):
            # Compute frequency count for substring [i, j]
            counts = [presum[j + 1][d] - presum[i][d] for d in range(10)]
            # Filter out zeros, and check if set of nonzero counts has length 1
            nonzero_counts = [c for c in counts if c > 0]
            if nonzero_counts and all(count == nonzero_counts[0] for count in nonzero_counts):
                unique.add(s[i:j+1])
    return len(unique)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × 10) ≈ O(n²). There are O(n²) substrings, and for each substring, we check up to 10 digits for their count.
- **Space Complexity:** O(n²) for the set that can store up to O(n²) unique substrings in the worst case (all different).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt your solution if you only need to count the number of substrings (including duplicates) instead of unique substrings?  
  *Hint: Do not use a set, just increment the count when the condition is satisfied.*

- How can you handle an alphabet string (not just digits), or an arbitrary character set?  
  *Hint: Generalize your prefix sum to the alphabet size.*

- Can you optimize for the case where only substrings of a given length are considered?  
  *Hint: Just iterate with a fixed-length sliding window.*

### Summary
This is a **prefix sum** + **enumeration** problem, commonly appearing in string frequency problems. Storing substring frequencies in a set to ensure uniqueness is a typical pattern for substring uniqueness questions. Prefix sums (precomputed per character) greatly optimize retrieving frequency counts in any substring. This pattern arises in substring-counting, anagrams, or palindromic substring counting problems.

### Tags
Hash Table(#hash-table), String(#string), Rolling Hash(#rolling-hash), Counting(#counting), Hash Function(#hash-function)

### Similar Problems
- Number of Equal Count Substrings(number-of-equal-count-substrings) (Medium)
- Substrings That Begin and End With the Same Letter(substrings-that-begin-and-end-with-the-same-letter) (Medium)