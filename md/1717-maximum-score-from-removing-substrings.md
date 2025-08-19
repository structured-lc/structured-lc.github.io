### Leetcode 1717 (Medium): Maximum Score From Removing Substrings [Practice](https://leetcode.com/problems/maximum-score-from-removing-substrings)

### Description  
Given a string **s** and two integers **x** and **y**, you can repeatedly remove substrings "ab" (earning **x** points) and "ba" (earning **y** points) from the string. Each removal is non-overlapping and can be done in any order, with each removal potentially creating new opportunities for further removals. Your task is to maximize your total score by strategically picking which substrings to remove first.

### Examples  

**Example 1:**  
Input: `s = "cdbab", x = 4, y = 5`  
Output: `9`  
*Explanation: First remove "ba" (score +5), s becomes "cdb". Then "ab" exists, remove "ab" (score +4); string becomes "cd". Final score = 5 + 4 = 9.*

**Example 2:**  
Input: `s = "ababbab", x = 3, y = 4`  
Output: `19`  
*Explanation: It’s optimal to remove all "ba" first (y = 4):  
s → "abab\_\_bab" → remove "ba" at pos 5-6, score +4, s = "ababb"  
Again remove "ba" at pos 2-3, score +4, s = "abb"  
Again remove "ba" at pos 0-1, score +4, s = "b"  
Now remove "ab" (x = 3) from earlier, in each occurrence possible. In total, you maximize your score to 19.*

**Example 3:**  
Input: `s = "aabbaaxybbaabb", x = 5, y = 4`  
Output: `28`  
*Explanation: Since x > y, remove "ab" first (score 5 each). Any time you remove "ab", do so until not possible. Then remove "ba"s (score 4 each) from what remains. Continue till the string is exhausted for possible removals. Final sum = 28.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try every possible sequence of substring removals, calculate the score, and track the maximum. This would involve backtracking all possible removal choices.  
  *Complexity*: Exponential due to the branching of each removal option. Not feasible for large strings.

- **Greedy Optimization:**  
  Since we can only remove "ab" or "ba", and each can potentially create new removal opportunities, always remove the higher-value substring first (either "ab" or "ba", depending on which score is higher).  
  ● If x ≥ y, prioritize removing "ab" throughout the string, then remove all "ba".  
  ● If y > x, prioritize removing "ba" first, then "ab".  
  For each removal pass, use a stack/array to efficiently identify and remove the target pairs (O(n) per pass).

- **Trade-offs:**  
  - The reason for this order is that removing the higher-valued substring first can prevent the lower-valued pair from forming, which overall gives greater points.
  - Stack-based removal is efficient & clean since substrings can cascade due to removals.

- **Final approach:**  
  Stack-based two-pass greedy. Remove all occurrences of the higher-valued pair, then repeat for the lower-valued one.

### Corner cases to consider  
- s is empty → score is 0.
- x and y are zero or negative → must still maximize score, negative removals might mean *not* removing.
- Strings with only "a"s or only "b"s → no "ab" or "ba" to remove.
- s contains overlapping/removable substrings like "ababab" → greedy order is critical.
- Very large s (performance).

### Solution

```python
def maximumGain(s: str, x: int, y: int) -> int:
    # Helper to remove all of one type of pair and return new string and score
    def remove_pair(s, first, second, value):
        stack = []
        score = 0
        for c in s:
            if stack and stack[-1] == first and c == second:
                stack.pop()
                score += value
            else:
                stack.append(c)
        # stack contains the new string after removals
        return ''.join(stack), score

    # Decide which pair to prioritize based on higher score
    if x >= y:
        # Remove all "ab" first, then "ba"
        remaining_s, score_ab = remove_pair(s, 'a', 'b', x)
        _, score_ba = remove_pair(remaining_s, 'b', 'a', y)
        return score_ab + score_ba
    else:
        # Remove all "ba" first, then "ab"
        remaining_s, score_ba = remove_pair(s, 'b', 'a', y)
        _, score_ab = remove_pair(remaining_s, 'a', 'b', x)
        return score_ba + score_ab
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  Each character is processed at most twice (in two passes: once for each substring type).

- **Space Complexity:** O(n).  
  Extra space for the stack and the potentially reduced strings after each pass.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the pairs to be removed are of length k (not always two)?
  *Hint: Consider generalizing the stack or sliding window logic for k-length substrings.*

- Can you do it in one pass, or do you always need two passes?
  *Hint: Try to process both substrings at once, but show why this may give suboptimal results.*

- How does your code handle when x or y are negative?
  *Hint: Is it ever beneficial to skip certain removals? When?*

### Summary
This problem is a classic **greedy (two-pass) stack pattern**: always eliminate the highest-score substring first to block formation of lesser-value pairs. This pattern is common in string reduction problems where order of operations matters, especially when overlapping or cascading impacts are possible. The use of a stack to model removals of adjacent substrings is an efficient and robust pattern, reusable for other string removal or bracket-matching problems.

### Tags
String(#string), Stack(#stack), Greedy(#greedy)

### Similar Problems
- Count Words Obtained After Adding a Letter(count-words-obtained-after-adding-a-letter) (Medium)