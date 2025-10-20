### Leetcode 2531 (Medium): Make Number of Distinct Characters Equal [Practice](https://leetcode.com/problems/make-number-of-distinct-characters-equal)

### Description  
Given two strings `word1` and `word2`, you can swap exactly one character from `word1` with one from `word2`.  
Return `True` if, after this swap, both strings have the **same number of distinct characters**; else, return `False`.  
The swap must occur: you cannot opt to leave the strings unchanged.

### Examples  

**Example 1:**  
Input: `word1 = "ac"`, `word2 = "b"`  
Output: `True`  
*Explanation: Swap `'a'` from `word1` with `'b'` from `word2`, resulting in `word1 = "bc"`, `word2 = "a"`.  
Now both have 2 distinct characters (`'b','c'` and `'a'`), so answer is True.*

**Example 2:**  
Input: `word1 = "abcc"`, `word2 = "aab"`  
Output: `True`  
*Explanation: Swap `'b'` from `word1` with `'a'` from `word2`, resulting in `word1 = "aacc"`, `word2 = "abb"`.  
Now both have 2 distinct characters (`'a','c'` and `'a','b'`).*

**Example 3:**  
Input: `word1 = "abc"`, `word2 = "def"`  
Output: `True`  
*Explanation: Swap `'a'` (from `word1`) with `'d'` (from `word2`). After swap, `word1 = "dbc"` and `word2 = "aef"`.  
Both have 3 distinct characters. Any swap works, as no letters are shared and counts won't change.*

### Thought Process (as if you’re the interviewee)  
First, brute-force could try every possible character pair between `word1` and `word2` and swap them, checking post-swap distinct counts.  
But since only the set of distinct characters matters, and there are at most 26 lowercase English letters, we can use a more optimal method:

- Count the frequency of each letter in both words.
- Try all 26 × 26 swaps (one letter from `a`-`z` in each word).
- For each possible swap, simulate removing one occurrence of the chosen letter from each word and adding the letter from the other word.
- Track the resulting number of distinct characters for both words.
- If any simulated swap results in equal distinct character counts, return True.
- Otherwise, return False.

This approach is efficient because tries at most 676 swaps, regardless of input size.

### Corner cases to consider  
- All letters are already the same; swapping doesn’t change distinct counts.
- One word has only one unique letter; the swap introduces a new one.
- Words share all the same letters; some swaps may make no difference.
- Words are of length 1.
- Characters to be swapped are the same.
- Swapping could introduce or remove a distinct letter.

### Solution

```python
def isItPossible(word1: str, word2: str) -> bool:
    # Count frequency of each lowercase letter in each word
    from collections import Counter

    cnt1 = Counter(word1)
    cnt2 = Counter(word2)

    # Try every combination of possible swap (a-z)
    for ch1 in cnt1:
        for ch2 in cnt2:
            if ch1 == ch2:
                # Swapping same letter doesn't change anything, skip
                continue

            # Remove ch1 from word1, add ch2; vice versa for word2
            # Simulate the swap
            t_cnt1 = cnt1.copy()
            t_cnt2 = cnt2.copy()
            t_cnt1[ch1] -= 1
            if t_cnt1[ch1] == 0:
                del t_cnt1[ch1]
            t_cnt1[ch2] = t_cnt1.get(ch2, 0) + 1

            t_cnt2[ch2] -= 1
            if t_cnt2[ch2] == 0:
                del t_cnt2[ch2]
            t_cnt2[ch1] = t_cnt2.get(ch1, 0) + 1

            # Compare number of distinct characters
            if len(t_cnt1) == len(t_cnt2):
                return True

    # Now, handle the case where we swap identical letters (could matter if letters are repeated)
    for ch in cnt1:
        if ch in cnt2:
            # No effect: both lose and gain the same letter; but try only if counts allow
            if len(cnt1) == len(cnt2):
                return True

    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(26 × 26 + n + m), where n, m are the lengths of `word1`, `word2`. Initialize counts in O(n + m); main loop is constant (676).
- **Space Complexity:** O(1), because the largest extra storage is the fixed-size (up to 26) copies of the counts, regardless of input length.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if you can repeat the swap operation multiple times?  
  *Hint: Think DP or greedy; possibly reduces to set equality after arbitrary swaps.*

- What if you can only swap adjacent characters between strings?  
  *Hint: Now adjacency constraints matter; how to minimize swaps (think shortest path or BFS).*

- How would you generalize to support uppercase, digits, or unicode characters?  
  *Hint: Use hashmaps and rethink frequency counts; 26 is no longer the upper bound.*

### Summary
This approach uses brute-force over a restricted search space (26 × 26 max swaps), which is efficient due to the limited alphabet.  
The pattern is “frequency map simulation”, often used in string, anagram, and distinctiveness problems.  
It’s widely applicable when possible transitions depend more on sets or multisets of characters than on actual word structure or order.


### Flashcard
For each possible letter swap between words, update frequency counts and check if distinct counts match—only 26×26 swaps needed.

### Tags
Hash Table(#hash-table), String(#string), Counting(#counting)

### Similar Problems
- Bulls and Cows(bulls-and-cows) (Medium)
- Buddy Strings(buddy-strings) (Easy)
- Minimum Swaps to Make Strings Equal(minimum-swaps-to-make-strings-equal) (Medium)
- Check if One String Swap Can Make Strings Equal(check-if-one-string-swap-can-make-strings-equal) (Easy)
- Check if All Characters Have Equal Number of Occurrences(check-if-all-characters-have-equal-number-of-occurrences) (Easy)