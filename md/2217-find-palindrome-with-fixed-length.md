### Leetcode 2217 (Medium): Find Palindrome With Fixed Length [Practice](https://leetcode.com/problems/find-palindrome-with-fixed-length)

### Description  
Given an array of queries and an integer intLength, return an array where the iᵗʰ element is either the queries[i]ᵗʰ smallest positive palindrome of length intLength, or -1 if such a palindrome does not exist.  
A palindrome is a number that reads the same forwards and backwards, and cannot have leading zeros.  
Essentially, for each query, you must construct the kᵗʰ positive palindrome of a specified length.

### Examples  

**Example 1:**  
Input: `queries = [1,2,3,4,5,90]`, `intLength = 3`  
Output: `[101,111,121,131,141,999]`  
*Explanation: The first few 3-digit palindromes are: 101, 111, 121, 131, 141, ..., and the 90ᵗʰ such palindrome is 999.*

**Example 2:**  
Input: `queries = [2,4,6]`, `intLength = 4`  
Output: `[1111,1331,1551]`  
*Explanation: The first six 4-digit palindromes are 1001, 1111, 1221, 1331, 1441, 1551.*

**Example 3:**  
Input: `queries = [1,1000]`, `intLength = 2`  
Output: `[11,-1]`  
*Explanation: Only 9 two-digit palindromes exist: 11,22,...,99. As 1000 > 9, output -1 for query 1000.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Generate all possible palindromes of length intLength and iterate/count until reaching each queries[i]. This is impractical for large intLength (up to 15 digits) due to exponential growth of candidates.
- **Optimization Insight:**  
  - Each palindrome of length ℓ is fully determined by its first ⌈ℓ/2⌉ digits.  
  - For intLength = 3, palindromes are of the form aba → just pick a from 1..9, b from 0..9.
  - For length = 4, palindromes are abba → pick a from 1..9 and b from 0..9.
  - So there are 9 × 10⁽⌊ℓ/2⌋⁾ valid first halves (excluding leading zeros for a).
- **Position Calculation:**  
  - For a queries[i], compute the first half = smallest valid number + (queries[i] - 1).
  - If this half exceeds the max possible, output -1.
  - Otherwise, mirror it correctly to build the full palindrome (skip last digit for odd intLength, mirror all for even).
- **Efficiency:** This is O(1) per query, no need to check or generate all palindromes.
- **Tradeoffs:** Directly indexes the answer; works because palindromes have a strict order determined by the left half.

### Corner cases to consider  
- **intLength = 1** (Single-digit: 1 to 9 only)
- **queries[i]** larger than total possible palindromes for intLength (e.g., ask for the 1000ᵗʰ 2-digit palindrome)
- **intLength** is very large (potential integer overflow—ensure correct data type)
- **queries[i] = 1** (should return the smallest valid palindrome for that length)
- **intLength** is even vs odd (mirroring slightly different)

### Solution

```python
def kthPalindrome(queries, intLength):
    result = []
    half_len = (intLength + 1) // 2  # length of first half

    start = 10 ** (half_len - 1)     # smallest number with required digits, no leading zero
    for k in queries:
        half = start + (k - 1)
        # Check: is this half too big?
        if half >= 10 ** half_len:
            result.append(-1)
            continue
        half_str = str(half)
        # Build palindrome: mirror with/without middle digit
        if intLength % 2 == 0:
            full_str = half_str + half_str[::-1]
        else:
            full_str = half_str + half_str[-2::-1]
        result.append(int(full_str))
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(q), where q = len(queries). Each query is handled in O(1): string manipulation and arithmetic only.
- **Space Complexity:** O(q) for the result list. No extra storage beyond that.

### Potential follow-up questions (as if you’re the interviewer)  

- What if palindromes with leading zeros were also allowed?  
  *Hint: How would it change how you calculate the valid range for the first half?*

- Can you return the answers as strings instead of integers, to support even larger values (up to 15 digits)?  
  *Hint: Python ints are arbitrary-precision, but not all languages are. Think about string manipulation in your palindrome construction.*

- How would you find the kᵗʰ smallest palindrome in a specific numeric range, not just by length?  
  *Hint: Precompute all valid palindromes in range, or adapt binary search on the first half.*

### Summary
This problem uses the **constructive math pattern**—directly computing the answer by indexing and palindromic mirroring, not brute force enumeration. The construct-by-half approach is common for palindromic number, string, or sequence generation, and is directly reusable in other palindrome-related problems or digit-structure algorithms. The string manipulation and arithmetic is efficient and deterministic, avoiding expensive searches or precomputations.