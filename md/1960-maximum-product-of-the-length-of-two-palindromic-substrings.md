### Leetcode 1960 (Hard): Maximum Product of the Length of Two Palindromic Substrings [Practice](https://leetcode.com/problems/maximum-product-of-the-length-of-two-palindromic-substrings)

### Description  
Given a string `s`, find two **disjoint** palindromic substrings (can be anywhere in the string, as long as they do not overlap) such that **both have odd length** and the product of their lengths is maximized. Return this maximum product.  
A palindrome reads the same backward and forward (e.g., "racecar"). You want to select two ranges `[i, j]` and `[k, l]` (0 ≤ i ≤ j < k ≤ l < n) such that both substrings are palindromes, have odd length, do not overlap, and the product of their lengths is as large as possible.

### Examples  

**Example 1:**  
Input: `s = "ababbb"`  
Output: `9`  
*Explanation: There are two odd-length palindromes: "aba" (positions 0-2) and "bbb" (positions 3-5). Both are length 3. The product is 3×3=9.*

**Example 2:**  
Input: `s = "zaaaxbbby"`  
Output: `9`  
*Explanation: "aaa" (positions 1-3) and "bbb" (positions 5-7) are maximum odd-length palindromes. Product is 3×3=9.*

**Example 3:**  
Input: `s = "acdapmpomp"`  
Output: `15`  
*Explanation: "pmpmp" (positions 4-8, length 5) and "aca" (positions 0-2, length 3) can be chosen. 5×3=15. But actually, with the same logic, "pmpmp" and "ada" gives 5×3=15, which is still the maximum. The output is 15.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible substrings, check for palindromes, and pick two disjoint ones — but this is O(n³) or worse and too slow for large n.
- **Optimized idea:**  
  - If we can quickly, for every prefix (ending at i), get the length of the longest odd-length palindrome ending there; and for every suffix (starting at i), the longest odd-length palindrome starting there, we can split at every position and try the product of max palindrome in the left and right parts.
  - **Key:** Use Manacher’s Algorithm to compute, for every center, the length of the largest odd palindrome centered there in O(n) time.
  - For each split index, keep `maxLeft[i]`: max odd-length palindrome in s[0..i], and `maxRight[i]`: max odd-length palindrome in s[i..n-1].
  - Then, try all splits at position i (1 ≤ i < n), and compute max product `maxLeft[i-1] × maxRight[i]`.
- **Why Manacher?**: Fastest possible way to get all odd palindromic radii in a string.

### Corner cases to consider  
- String length < 2: only one substring — can’t pick two non-overlapping palindromes.
- All characters unique: only palindromes are single-letter.
- Entire string itself is a palindrome.
- Large strings: efficiency matters.
- Palindromes with even length should be ignored.

### Solution

```python
def maxProduct(s: str) -> int:
    n = len(s)
    
    # Helper that returns max odd palindrome length for each center
    def manacher(s: str) -> list[int]:
        n = len(s)
        lens = [0] * n  # lens[i] = radius of max odd palindrome centered at i
        l, r = 0, -1
        p = [0] * n  # p[i] = palindrome span around i
        for i in range(n):
            k = 1 if i > r else min(p[l + r - i], r - i + 1)
            while 0 <= i - k and i + k < n and s[i - k] == s[i + k]:
                k += 1
            p[i] = k - 1
            if i + p[i] > r:
                l, r = i - p[i], i + p[i]
        # lens[i] gives diameter (length) = 2*p[i] + 1 centered at i
        max_at = [1] * n
        for i in range(n):
            left = i - p[i]
            right = i + p[i]
            max_at[right] = max(max_at[right], 2*p[i]+1)
        # For each index, max_at[i]: max odd length palindrome ending at or before i
        for i in range(1, n):
            max_at[i] = max(max_at[i], max_at[i-1])
        return max_at

    # maxLeft[i] = max odd palindrome length in s[0..i]
    maxLeft = manacher(s)
    # maxRight[i] = max odd palindrome length in s[i..n-1]
    maxRight = manacher(s[::-1])[::-1]
    
    ans = 0
    # Try every split between [0..i-1] and [i..n-1]
    for i in range(1, n):
        ans = max(ans, maxLeft[i-1] * maxRight[i])
    return ans
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n). Manacher’s Algorithm for odd-length palindromes is O(n). We run it twice, for s and s[::-1], and a final O(n) pass to combine results.
- **Space Complexity:** O(n). For maxLeft and maxRight arrays and palindrome data.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to allow even-length palindromes as well?  
  *Hint: Modify the palindrome expansion method to handle both odd and even radii.*

- What if there can be overlap by just 1 character?  
  *Hint: Think about how to change the split positions and check overlap cases.*

- How would you count the number of such maximum-product pairs, not just find the maximum?  
  *Hint: For every split, count all pairs achieving the product.*

### Summary
This problem uses the **Manacher’s Algorithm** pattern for detecting all odd-length palindromic substrings efficiently, combined with precomputing maximal values over prefixes/suffixes (“max on left/right up to i”). It’s a classic case where O(n²) is hopeless but string palindrome symmetry + clever precomputation + split tries unlock an O(n) solution. This approach is also useful for substring or range-based optimal substructure problems, especially involving palindromes.