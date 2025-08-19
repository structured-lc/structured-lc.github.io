### Leetcode 2489 (Medium): Number of Substrings With Fixed Ratio [Practice](https://leetcode.com/problems/number-of-substrings-with-fixed-ratio)

### Description  
Given a binary string **s** and two coprime integers **num₁** and **num₂**, count how many non-empty substrings (contiguous substrings) of **s** have the number of 0’s to the number of 1’s in the exact ratio **num₁:num₂**.  
For example, if **num₁ = 2, num₂ = 3**, a substring is valid if it has 2 zeros and 3 ones. All such substrings in **s** need to be counted.

### Examples  

**Example 1:**  
Input: `s = "0101", num1 = 1, num2 = 1`  
Output: `3`  
*Explanation: Valid substrings with a 1:1 ratio of 0’s and 1’s are "01" (indices 0-1), "10" (1-2), and "01" (2-3). Each contains exactly one 0 and one 1.*

**Example 2:**  
Input: `s = "00110011", num1 = 2, num2 = 2`  
Output: `6`  
*Explanation: Valid substrings with a 2:2 ratio (i.e. two 0’s and two 1’s) include: "0011" (0-3), "0110" (1-4), "1100" (2-5), "1001" (3-6), "0011" (4-7), and "00110011" (0-7). Each contains 2 zeros and 2 ones.*

**Example 3:**  
Input: `s = "010101", num1 = 2, num2 = 1`  
Output: `2`  
*Explanation: Valid substrings with a 2:1 ratio: "010" (indices 0-2) and "101" (indices 1-3). Each contains exactly two 0’s and one 1.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach tries all possible substrings and counts 0’s and 1’s for each. This leads to O(n²) time, which is too slow for long strings.

To optimize:
- We observe that a substring s[l..r] has a ratio num₁:num₂ if count₀₍r₎-count₀₍l₋₁₎ = k×num₁ and count₁₍r₎-count₁₍l₋₁₎ = k×num₂ for some k≥1.
- This is equivalent to tracking the running totals of zeros and ones at each position, and for each possible start l, checking whether their differences at two positions meet the required multiple.
- Inspired by subarray sum equals k, we use a frequency map to store the difference: diff = count₁×num₁ - count₀×num₂.
- For the current prefix (up to i), if the same diff has been seen before, substrings between previous indices and current index have fixed ratio.

We use a hashmap to store counts of diffs as we scan the string.

This is O(n) time and O(n) space.

### Corner cases to consider  
- Empty string (should return 0)
- All 0’s or all 1’s, so ratio can never be met
- num₁ or num₂ higher than the max possible count of 0’s/1’s in s
- String length 1 (no valid substrings)
- Large input string where O(n²) would timeout

### Solution

```python
def fixedRatio(s: str, num1: int, num2: int) -> int:
    # n0: total number of 0's seen so far
    # n1: total number of 1's seen so far
    n0 = 0
    n1 = 0
    # ans: number of valid substrings
    ans = 0
    # cnt maps (n1 * num1 - n0 * num2) to frequency seen so far
    cnt = {0: 1}
    for c in s:
        if c == '0':
            n0 += 1
        else:
            n1 += 1
        key = n1 * num1 - n0 * num2
        ans += cnt.get(key, 0)
        cnt[key] = cnt.get(key, 0) + 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We scan the string once and perform constant-time dictionary operations.
- **Space Complexity:** O(n) — At most, the hashmap stores O(n) unique prefix values.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you modify this to output the actual substrings, not just a count?  
  *Hint: Store the start indices for each prefix difference.*

- What if num₁ and num₂ are not coprime?  
  *Hint: Consider greatest common divisor and check for k-multiples in substrings.*

- How would you solve this for larger alphabets (not just binary strings)?  
  *Hint: Extend the idea to count multiple character frequencies and track their ratios.*

### Summary
We used a prefix sum and hashmap pattern, commonly seen in subarray or substring sum/count problems (like subarray sum equals k). By encoding the ratio with n₁ \* num₁ - n₀ \* num₂, the count reduces to tracking previously seen prefix states. This approach is fast (O(n)), space-efficient, and widely applicable in substring/subarray problems involving frequency or sum ratios.

### Tags
Hash Table(#hash-table), Math(#math), String(#string), Prefix Sum(#prefix-sum)

### Similar Problems
- Count Binary Substrings(count-binary-substrings) (Easy)