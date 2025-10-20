### Leetcode 1842 (Hard): Next Palindrome Using Same Digits [Practice](https://leetcode.com/problems/next-palindrome-using-same-digits)

### Description  
Given a numeric string `num` representing a large palindrome, return the smallest palindrome strictly greater than `num` that can be created by rearranging its digits.  
You must use all digits of `num` exactly once; you cannot add, remove, or reuse digits.  
If no such palindrome exists, return an empty string `""`.  
A palindrome is a number that reads the same backward as forward.

### Examples  

**Example 1:**  
Input: `num = "1221"`  
Output: `2112`  
Explanation:  
- All possible palindromic permutations of "1221": ["1221", "2112"].  
- "2112" is the only palindrome greater than "1221".

**Example 2:**  
Input: `num = "32123"`  
Output: ``  
Explanation:  
- "32123" is already the largest palindrome you can make with its digits. No greater palindrome can be constructed.

**Example 3:**  
Input: `num = "45544554"`  
Output: `54455445`  
Explanation:  
- All possible palindromic permutations of "45544554": ["45544554", "54455445"].
- "54455445" is strictly greater than "45544554".

### Thought Process (as if you’re the interviewee)  
First, generating all permutations of the digits and filtering for palindromes is infeasible for long inputs due to combinatorial explosion.  
I need to leverage the palindromic property:
- A palindrome is defined by its first ⌊n/2⌋ digits; the rest is a mirror (and possibly a central digit if n is odd).
- For next palindrome, I can try to find the **next lexicographically greater arrangement** for the *first half* (plus middle digit if odd length), then copy/mirror it to complete the palindrome.

Steps:
1. Split the number into left half, middle (if needed), and right half:
   - Even-length: left = num[:n//2], right = num[n//2:]
   - Odd-length: left = num[:n//2], mid = num[n//2], right = num[n//2+1:]
2. Find the **next permutation** of the left half (lexicographically greater), using something similar to "next permutation" algorithm.
3. Construct the new palindrome by combining left, (mid), and mirrored left.
4. If the new palindrome > original and uses all original digits once, return it. Else, if no such permutation exists, return "".

This approach is efficient and directly related to the "next permutation" and palindromic construction patterns.

### Corner cases to consider  
- Input is already the largest possible palindrome with these digits
- No possible palindromic permutation (e.g., letter counts do not match palindrome requirements)
- All digits equal (e.g., "8888")
- Input of length 1
- Input is already the smallest palindromic permutation
- Odd/even length differences

### Solution

```python
def nextPalindrome(num: str) -> str:
    n = len(num)
    half = n // 2
    # For palindromic property: consider first ⌊n/2⌋
    left = list(num[:half])
    # Save middle digit if odd length
    mid = num[half] if n % 2 else ''

    # Helper: apply 'next permutation' to the left side
    def next_permutation(arr):
        i = len(arr) - 2
        # Find first decreasing
        while i >= 0 and arr[i] >= arr[i + 1]:
            i -= 1
        if i == -1:
            return False  # already the largest arrangement
        j = len(arr) - 1
        while arr[j] <= arr[i]:
            j -= 1
        arr[i], arr[j] = arr[j], arr[i]
        arr[i+1:] = reversed(arr[i+1:])
        return True

    orig_palindrome = num
    # Try next permutations of left half until we find a valid next palindrome
    while next_permutation(left):
        candidate_left = ''.join(left)
        # Build new palindrome
        if n % 2 == 0:
            candidate = candidate_left + candidate_left[::-1]
        else:
            candidate = candidate_left + mid + candidate_left[::-1]
        if candidate > orig_palindrome:
            return candidate
    return ""
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since the "next permutation" of the half part runs in O(n), and palindrome construction is linear in n.
- **Space Complexity:** O(n), for storing left half and result string construction.

### Potential follow-up questions (as if you’re the interviewer)  

- What if duplicated palindromic permutations are possible?  
  *Hint: How do you ensure unique outputs only by avoiding repeated digit sequences?*

- How would you generalize this approach if only a subset of digits must be used?  
  *Hint: What changes in digit counting and palindrome validation?*

- If the number can have leading zeros, does anything change?  
  *Hint: Is a palindrome with leading zero considered valid by the problem? How does that affect your checks?*

### Summary
This uses the **next permutation** technique to generate the next lex greater left half, combining it with its mirror for palindrome formation. It leverages properties of palindromic numbers to optimize and avoid brute-force generation of all permutations. This pattern also appears in permutation-based next-value problems, string transformations, and palindromic sequence generation.


### Flashcard
Find next lex greater permutation of first half, mirror to form palindrome; skip invalid candidates.

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
- Next Greater Element III(next-greater-element-iii) (Medium)
- Find the Closest Palindrome(find-the-closest-palindrome) (Hard)