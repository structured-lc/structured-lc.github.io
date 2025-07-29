### Leetcode 2135 (Medium): Count Words Obtained After Adding a Letter [Practice](https://leetcode.com/problems/count-words-obtained-after-adding-a-letter)

### Description  
Given two lists of strings, **startWords** and **targetWords**, both containing only lowercase English letters, count how many words in `targetWords` can be obtained by taking some word in `startWords`, **adding a new letter not already in that word**, and then rearranging all the letters (i.e., permuting the resulting string).  
You can't change or reuse startWord strings—this is only a check for possibility.

### Examples  

**Example 1:**  
Input: `startWords = ["ant","act","tack"]`, `targetWords = ["tack","act","acti"]`  
Output: `2`  
*Explanation:  
"tack" can be formed from "act" by adding 'k', then reordering: "act" → "tack".  
"acti" can be formed from "act" by adding 'i', then reordering: "act" → "acti".  
"act" cannot be formed since it doesn't require adding a new letter (only rearrangements aren't allowed).*

**Example 2:**  
Input: `startWords = ["ab","a"]`, `targetWords = ["abc","abcd"]`  
Output: `1`  
*Explanation:  
"abc" can be formed from "ab" by adding 'c'.  
"abcd" cannot be formed from any startWord with only one addition. Only one targetWord works, so result is 1.*

**Example 3:**  
Input: `startWords = ["xyz"]`, `targetWords = ["xy","xyz","xyza"]`  
Output: `1`  
*Explanation:  
Only "xyza" can be formed by adding 'a' to "xyz".  
"xy" and "xyz" cannot be obtained by adding a letter and rearranging.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  For each word in `startWords`, for each possible letter not already present, add the letter, generate all possible permutations, and check if any permutation matches a targetWord. Repeat for all targetWords. This would be extremely slow due to factorial permutations for even modest word lengths.

- **Key observation:**  
  Since order doesn't matter (due to rearrangement), each word can be represented as a **set of letters** or sorted string.

- **Optimized approach:**  
  - Convert each startWord into a set (for quick letter presence checks), or, for better efficiency, use a **bitmask** to represent each unique set of characters (since there are ≤26 lowercase).
  - For targetWords, remove each character in turn (since each was supposedly the "added" letter), and check if the remaining letter set matches any startWord (bitmask set).
  - If such a subset exists, this targetWord can be formed.

- **Why the bitmask?**  
  - Bitmask encoding allows instant set comparison and subtraction with O(1) time, instead of sorting or constructing sets for each check.

- **Trade-offs:**  
  - Bitmasking technique is extremely fast and uses a small amount of space (max 2²⁶ masks).
  - This avoids repeated sorting and works well for constraints (words of length ≤26).

### Corner cases to consider  
- Empty arrays for startWords or targetWords
- Words with repeated letters (shouldn't happen per problem, but handle gracefully)
- Single-letter words
- startWords and targetWords with completely disjoint letter sets
- targetWord is a permutation of a startWord but does not have an extra letter (should NOT be counted)

### Solution

```python
def wordToMask(word):
    # Create a 26-bit integer mask for the word
    mask = 0
    for ch in word:
        mask |= 1 << (ord(ch) - ord('a'))
    return mask

def countWordsObtainedAfterAddingALetter(startWords, targetWords):
    # Step 1: Convert each startWord to a bitmask and store in a set
    start_masks = set()
    for word in startWords:
        mask = wordToMask(word)
        start_masks.add(mask)

    result = 0

    # Step 2: For each targetWord, try removing each character and check if the resulting mask exists
    for word in targetWords:
        mask = wordToMask(word)
        for i in range(26):
            # If iᵗʰ bit is set (letter present), try removing it
            if mask & (1 << i):
                new_mask = mask ^ (1 << i)
                if new_mask in start_masks:
                    result += 1
                    break  # Only count each targetWord once

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(K + L \* 26), where K is the total number of characters in startWords, L is the total number of characters in targetWords. For each targetWord, we check at most 26 possible letters for removal—this is constant time per word.
- **Space Complexity:** O(N), where N is the number of startWords, for the set of masks. Other variables use constant space.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if you can **replace** a letter instead of only add?
  *Hint: For each targetWord, consider all possible single-letter changes and compare with startWords.*

- If you can **add more than one letter** (e.g., up to k additions), how would you optimize the check?
  *Hint: Precompute all masks formed by adding ≤k letters for each startWord?*

- Suppose the words can contain **uppercase** and **lowercase** letters; how would the bitmask change?
  *Hint: Use 52-bit or two separate masks, map accordingly.*

### Summary
This problem leverages the *bitmasking* pattern to efficiently represent and manipulate sets of characters—ideal whenever you're working with subsets of a small, fixed alphabet. The idea to check for a possible predecessor mask by removing each character and seeing if it exists is related to other set-building or "remove and check" problems, useful in word games, dictionary construction, and subset-difference checks. The overall approach is both common and optimal in problems where the universe size is small and operations must be fast.