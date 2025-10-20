### Leetcode 1071 (Easy): Greatest Common Divisor of Strings [Practice](https://leetcode.com/problems/greatest-common-divisor-of-strings)

### Description  
You are given two strings, **str1** and **str2**. Find the **largest possible string X** such that both **str1** and **str2** can be constructed by concatenating one or more copies of **X**. In other words, X divides both **str1** and **str2** (where dividing means a string can be formed by repeating another string some number of times).

### Examples  

**Example 1:**  
Input: `str1 = "ABCABC", str2 = "ABC"`  
Output: `"ABC"`  
*Explanation: "ABC" can be repeatedly concatenated to get both "ABCABC" ("ABC"+"ABC") and "ABC"—so "ABC" is the GCD string.*

**Example 2:**  
Input: `str1 = "ABABAB", str2 = "ABAB"`  
Output: `"AB"`  
*Explanation: "AB" can be concatenated three times to get "ABABAB", and two times to get "ABAB".*

**Example 3:**  
Input: `str1 = "LEET", str2 = "CODE"`  
Output: `""`  
*Explanation: No string other than the empty string divides both ("LEETCODE" ≠ "CODELEET"), so return an empty string.*

### Thought Process (as if you’re the interviewee)  
First, I want to check: **What does it mean for a string to divide another?**  
If `str1` is made up of repeated `X`, then `str1` should be equal to `X * k1` for some integer `k1`, and similarly for `str2`. 

#### Brute-force idea:
- Try all substrings of `str1` with length up to `min(len(str1), len(str2))`.
- For each substring, check if it can compose both `str1` and `str2` (using repetition).
- **Downside:** Inefficient. For strings up to length 10³, this is too slow.

#### Optimized (GCD-based) approach:
- If a string X divides both, it must be a prefix of both, and its length must divide lengths of both strings.
- A key insight: If `str1 + str2 == str2 + str1`, then both strings are some multiple of a common substring. Otherwise, there's no common divisor.
- The GCD of the lengths of `str1` and `str2` gives the maximal possible length for such a substring.
- Try `str1[:gcd(len(str1), len(str2))]` as the candidate. Check if repeating it appropriately gives both strings.

### Corner cases to consider  
- Both strings are empty: return empty string.
- No common divisor: return empty string.
- Strings are already the same: return the string itself.
- One string is a repetition of the other.
- Completely different strings.

### Solution

```python
def gcdOfStrings(str1: str, str2: str) -> str:
    # Helper function to compute GCD of two numbers
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    # Check if concatenating in both orders gives the same result
    if str1 + str2 != str2 + str1:
        return ""
    
    # Find the GCD of the lengths
    n = gcd(len(str1), len(str2))
    
    # Return the prefix up to length n of either string
    return str1[:n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n), where m and n are lengths of str1 and str2.
  - The concatenation and equality checks take O(m + n).
  - GCD computation is efficient (at most log min(m, n) steps).
- **Space Complexity:** O(m + n), mainly for concatenated string comparisons and the substring output.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the input strings are extremely large (gigabytes), and we cannot concatenate them in-memory?
  *Hint: Consider checking the alternating pattern using substring slicing, without creating concatenated strings.*

- How would you generalize this approach for more than two strings?
  *Hint: Apply the GCD logic iteratively across all given strings.*

- Can you do this in-place or with constant extra space?
  *Hint: Work with string indices and avoid new string allocations when possible.*


### Summary
The problem is a variant of the **String Division/GCD** pattern: find the largest substring which both original strings can be constructed from via repetition.  
The key insight is checking string concatenation equality and using the GCD of the lengths for the candidate substring—an elegant combination of string handling and number theory. This technique generalizes to related string period or pattern problems.


### Flashcard
The GCD string is the largest prefix that can construct both str1 and str2 by repetition and satisfies str1 + str2 == str2 + str1.

### Tags
Math(#math), String(#string)

### Similar Problems
- Find Greatest Common Divisor of Array(find-greatest-common-divisor-of-array) (Easy)
- Smallest Even Multiple(smallest-even-multiple) (Easy)
- Find the Maximum Factor Score of Array(find-the-maximum-factor-score-of-array) (Medium)