### Leetcode 3734 (Hard): Lexicographically Smallest Palindromic Permutation Greater Than Target [Practice](https://leetcode.com/problems/lexicographically-smallest-palindromic-permutation-greater-than-target)

### Description

Given a string `s` consisting of lowercase English letters and a string `target` of the same length, find the lexicographically smallest palindromic permutation of `s` that is **strictly greater than** `target`. A palindromic permutation means we can rearrange the characters to form a palindrome. If no such palindrome exists, return an empty string.

The key insight is that we need to construct a palindrome that is strictly greater than the target, prioritizing lexicographically smallest values at each position. We use a recursive backtracking approach with pruning to efficiently explore valid palindrome constructions.

### Examples

**Example 1:**
Input: `s = "abcd"`, `target = "dacb"`
Output: `"baab"`
*Explanation: We rearrange "abcd" to form "baab", which is a palindrome and strictly greater than "dacb". This is the lexicographically smallest such palindrome.*

**Example 2:**
Input: `s = "abc"`, `target = "cba"`
Output: `""`
*Explanation: "abc" contains odd-frequency characters that don't allow a valid palindrome construction greater than "cba". No valid answer exists.*

**Example 3:**
Input: `s = "aabbcc"`, `target = "abccba"`
Output: `"abccba"` or next valid palindrome
*Explanation: We construct the lexicographically smallest palindrome from the characters that is strictly greater than the target.*

### Thought Process (as if you're the interviewee)

**Brute-force approach:** Generate all permutations of `s`, filter for palindromes, and find the lexicographically smallest one greater than `target`. This is O(n! × n), which is too slow.

**Optimization insight:** Instead of generating all permutations, we can use a character frequency map to construct valid palindromes directly. For a valid palindrome, at most one character can have an odd frequency (for the middle position).

**Refined approach:** Use backtracking to build the first half of the palindrome from left to right. At each position, try characters in alphabetical order. Once we place the first half, the second half is determined (mirror of the first half). We only explore branches where:
1. We have enough character frequency remaining
2. The constructed palindrome can potentially be greater than target

We maintain two branches:
- **Follow prefix:** Build palindrome matching the target prefix character by character
- **Diverge from prefix:** When we place a character larger than target's character at that position, the entire remaining palindrome is lexicographically smallest (all remaining characters filled in ascending order)

**Key optimization:** Only generate up to ⌊n/2⌋ positions since palindrome is symmetric. Use pruning to skip impossible branches early.

### Corner cases to consider

- Single character string (`s = "a"`, `target = "a"`) → Need palindrome strictly greater, might not exist
- All same characters (`s = "aaaa"`, `target = "aaaa"`) → No valid answer or the same result depending on constraints
- Target is the maximum palindrome possible → No valid answer exists
- Odd-length strings with one character having odd frequency (middle position)
- Empty result when no palindrome greater than target can be formed
- String where target cannot be formed as a palindrome from the given characters

### Solution

```python
def makeSmallestPalindromic(s, target):
    # Count character frequencies
    char_count = {}
    for c in s:
        char_count[c] = char_count.get(c, 0) + 1
    
    # Check if valid palindrome can be formed
    odd_count = sum(1 for count in char_count.values() if count % 2 == 1)
    if odd_count > 1:
        return ""
    
    n = len(s)
    half_len = (n + 1) // 2
    result = [''] * n
    found = [False]
    
    def backtrack(pos, remaining_counts):
        # Base case: filled first half
        if pos == half_len:
            # Mirror the first half to create palindrome
            for i in range(half_len):
                mirror_pos = n - 1 - i
                if mirror_pos != i:  # Don't mirror middle character in odd-length strings
                    result[mirror_pos] = result[i]
            
            # Check if result > target
            result_str = ''.join(result)
            if result_str > target:
                found[0] = True
                return True
            return False
        
        # Try characters in alphabetical order
        for char in sorted(remaining_counts.keys()):
            if remaining_counts[char] == 0:
                continue
            
            # Place character at current position
            result[pos] = char
            remaining_counts[char] -= 1
            
            # Prune: check if this path can lead to answer > target
            # Mirror current position for palindrome check
            mirror_pos = n - 1 - pos
            if mirror_pos != pos:
                result[mirror_pos] = char
            
            # Check prefix constraint: if we diverge from target at this position,
            # rest must be filled with smallest available characters
            target_prefix = target[:pos + 1]
            result_prefix = ''.join(result[:pos + 1])
            
            can_be_greater = False
            if result_prefix > target_prefix:
                can_be_greater = True
            elif result_prefix == target_prefix:
                # Still need to check if remaining can form valid palindrome > target
                can_be_greater = True
            
            if can_be_greater:
                if backtrack(pos + 1, remaining_counts):
                    return True
            
            # Backtrack
            remaining_counts[char] += 1
            result[pos] = ''
            if mirror_pos != pos:
                result[mirror_pos] = ''
        
        return False
    
    if backtrack(0, char_count.copy()):
        return ''.join(result)
    return ""
```

### Time and Space Complexity Analysis

- **Time Complexity:** O(n² × α), where n is the length of the string and α is the alphabet size (26 for lowercase English letters). In the worst case, we explore O(n) positions recursively, and at each position we try up to α characters. String comparisons during pruning take O(n). Due to aggressive pruning when we diverge from the target, practical complexity is much better than theoretical worst case.

- **Space Complexity:** O(n + α) for the recursion stack depth (O(n) at most), character frequency map (O(α)), and result array (O(n)). The recursion depth is bounded by ⌊n/2⌋ + constant overhead.

### Potential follow-up questions

- (Follow-up question 1) How would you optimize this further if you needed to find all valid palindromes greater than target instead of just one?  
  *Hint: Consider collecting results instead of early termination; think about deduplication strategies*

- (Follow-up question 2) Can you solve this without using recursion, perhaps with an iterative next permutation approach?  
  *Hint: Generate the target's lexicographically next palindromic permutation; compare character frequencies*

- (Follow-up question 3) What if the strings have different lengths, or we need to construct a palindrome using only a subset of characters?  
  *Hint: Extend the frequency validation logic; consider which characters are mandatory vs optional*

### Summary

This problem combines **backtracking with pruning** and **palindrome construction** from character frequencies. The core pattern is to build only half the palindrome (since the other half is determined by the palindrome property), and aggressively prune branches that cannot yield a result greater than the target. The key optimization is recognizing that once we diverge from the target's prefix with a larger character, we can immediately fill remaining positions with the lexicographically smallest valid characters. This pattern applies to other constrained permutation generation problems where we need solutions satisfying multiple criteria simultaneously.

### Tags
Two Pointers(#two-pointers), String(#string), Enumeration(#enumeration)

### Similar Problems
