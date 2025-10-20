### Leetcode 2030 (Hard): Smallest K-Length Subsequence With Occurrences of a Letter [Practice](https://leetcode.com/problems/smallest-k-length-subsequence-with-occurrences-of-a-letter)

### Description  
Given a string s, you need to construct the lexicographically smallest subsequence of length k such that it contains the character letter exactly repetition times. The subsequence must preserve the order of characters in s.  
Essentially, choose k characters from s (in order) to create the smallest string, ensuring exactly repetition number of letter characters are chosen.

### Examples  

**Example 1:**  
Input: `s = "leetcode", k = 4, letter = "e", repetition = 2`  
Output: `"eecd"`  
Explanation:  
- Need 4 characters, exactly 2 of them must be 'e'.  
- The smallest subsequence is "eecd" (Selecting 'e', 'e', 'c', 'd').

**Example 2:**  
Input: `s = "bbaa", k = 2, letter = "b", repetition = 2`  
Output: `"bb"`  
Explanation:  
- Need both 'b's to satisfy the requirement.

**Example 3:**  
Input: `s = "abcde", k = 3, letter = "a", repetition = 1`  
Output: `"abc"`  
Explanation:  
- "abc" is the smallest lexicographical subsequence of length 3 containing exactly one 'a'.

### Thought Process (as if you’re the interviewee)  
- **Brute Force**: Try all possible subsequences of length k and pick the smallest one satisfying the constraints. But there are O(2ⁿ) subsequences, so this is not feasible for large s.
- **Optimized Greedy with Stack**:  
  - Use a monotonic stack to maintain the minimal subsequence.
  - At every step, decide:  
    - Can I pop the character at the top of the stack (replace it with a better one)?  
    - If I skip the current character, do I still have enough remaining characters (of letter and total) to complete the requirements?
  - Prioritize pushing 'letter' to the stack if needed to satisfy repetition.
  - Count how many of letter are left to take, and how many could be skipped.
  - Only pop a character from the stack if:  
    - The resulting stack length including remaining characters can reach k,
    - And if we pop a 'letter', make sure we still can get repetition many.
  - This greedy + stack method is similar to building the smallest subsequence and used in problems like "Remove k digits".
- **Trade-offs**:  
  - Greedy ensures lexicographically minimal by always choosing the best valid option.
  - Must carefully carry forward the counts for letter - can’t pop or skip too many.

### Corner cases to consider  
- s contains only letter.
- s contains fewer than k letters of letter (should not happen per constraints).
- repetition == k (entire subsequence is only letter).
- repetition == 0 (should not occur per constraints, but if possible - no letter required).
- Multiple optimal answers: function must pick the lexicographically smallest.
- s length == k (must use the whole string).
- Only one occurrence of letter and repetition == 1.

### Solution

```python
def smallestSubsequence(s: str, k: int, letter: str, repetition: int) -> str:
    n = len(s)
    stack = []
    letter_in_stack = 0  # Number of 'letter' in the stack
    remain_letter = s.count(letter)
    
    for i, c in enumerate(s):
        # Remaining characters left to pick after this
        remain = n - i - 1
        
        # While stack is not empty:
        # - c < stack[-1] => better lexicographically
        # - If pop count + remaining chars can fill length K
        # - If popping stack[-1] does not take letter below minimum needed
        while (stack and
               c < stack[-1] 
               and len(stack) + remain >= k
               and (
                    stack[-1] != letter or letter_in_stack + remain_letter > repetition
               )):
            # If pop is 'letter', update count
            pop_char = stack.pop()
            if pop_char == letter:
                letter_in_stack -= 1
            # else, just pop

        # Only push if we still have less than k items after this
        # Also, if c == letter, must satisfy repetition constraint
        need_more = k - len(stack)
        min_letters_needed = repetition - letter_in_stack
        
        # For 'letter', forcibly take when possible and needed
        if c == letter:
            stack.append(c)
            letter_in_stack += 1
            remain_letter -= 1
        # For non-letter:
        elif need_more > min_letters_needed:
            # We have space left for mandatory 'letter', so can take c
            stack.append(c)
        else:
            # Can't take non-letter, must save places for 'letter'
            pass

    # At the end, stack may have > k, so we slice
    res = []
    cnt = 0
    for c in stack:
        if len(res) < k:
            if c == letter:
                if cnt < repetition:
                    res.append(c)
                    cnt += 1
                # else, skip extra 'letter'
            else:
                res.append(c)
    return ''.join(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
   - Each character is pushed and popped from the stack at most once, so linear time.
- **Space Complexity:** O(n)  
   - Stack and result could potentially store up to n characters, so linear in input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the approach if you wanted "at least" repetition instead of "exactly"?
  *Hint: Relax skipping condition for excess letters at the end.*

- Can you generalize for multiple letter requirements (like: exactly r₁ a’s and r₂ b’s)?
  *Hint: Use maps for each letter, track each in and out like the core logic.*

- What changes if repeated letters are allowed or string may contain uppercase?
  *Hint: Logic is unchanged, but be sure your count and comparisons are correct per the new alphabet/rules.*

### Summary
This problem uses the **Greedy + Monotonic Stack** pattern, common to many string optimization problems ("Remove K Digits", "Lexicographically Smallest Subsequence"), but adds constraints on the occurrence of a specific letter. Counting, careful skipping, and greedy stack manipulation are key. The general pattern is widely applicable in string problems where lexicographical and element number constraints must be balanced.


### Flashcard
Use a monotonic stack to build the smallest subsequence, ensuring enough target letter occurrences remain—greedily pop when a better character is found.

### Tags
String(#string), Stack(#stack), Greedy(#greedy), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Remove Duplicate Letters(remove-duplicate-letters) (Medium)
- Subarray With Elements Greater Than Varying Threshold(subarray-with-elements-greater-than-varying-threshold) (Hard)
- Find the Lexicographically Smallest Valid Sequence(find-the-lexicographically-smallest-valid-sequence) (Medium)