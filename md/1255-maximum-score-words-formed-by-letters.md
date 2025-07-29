### Leetcode 1255 (Hard): Maximum Score Words Formed by Letters [Practice](https://leetcode.com/problems/maximum-score-words-formed-by-letters)

### Description  
Given a list of words, a list of available letters (possibly with duplicates), and a score for each letter, pick any subset of words (no repeated letters), using only the available letters (don't exceed supply per letter), to maximize your total letter score (sum of letter scores in chosen words). Return the maximum possible score.

### Examples  
**Example 1:**  
Input: `words = ["dog","cat","dad","good"], letters = ["a","a","c","d","d","g","o","o"], score = [1,0,9,5,0,0,3,0,0,2,0,0,0,4,8,6,7,0,1,2,5,9,0,0,0,0]`  
Output: `23`  
*Explanation: Pick "dad" (5+1+5=11) and "good" (3+8+2+9=22). But letters are not enough for all, so max is 23 ("dad":"d a d"=5+1+5=11 + "good":"g o o d"=3+2+2+5=12, but only two d's and two o's, can't use both).* 

**Example 2:**  
Input: `words = ["xxxz","ax","bx","cx"], letters = ["z","a","b","c","x","x","x"],  score = [4,4,4,5,8,7,6,5,4,3,2,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0]`  
Output: `27`  
*Explanation: Pick "xxxz" + "ax" + "bx" + "cx". Use all xs and one each of a,b,c,z.*

**Example 3:**  
Input: `words = ["leetcode"], letters = ["l","e","t","c","o","d"], score = [0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]`  
Output: `0`  
*Explanation: Not enough e's and no second o. Can't use word.*

### Thought Process (as if you’re the interviewee)  
- The crux: For each subset of words, check if it can be constructed with given letter counts. If yes, compute its total score and keep the maximum.
- Brute-force: Try all subsets of words (2ⁿ), for each, check if letters are sufficient, and calculate total score if valid.
- For each word, count frequency of each letter; for each subset, sum up frequencies, compare against letter supply.
- Since n ≤ 14, 2ⁿ is at most 16,384, so this brute-force is tractable.
- Choose to generate all possible subsets using bitmasks (each bit: include or exclude a word), check for validity (doesn't exceed counts).
- For further optimization, precompute score for each word and each word's letter count vector.

### Corner cases to consider  
- Letter supply is empty or doesn't cover any word
- Letter supply covers only part of words, some letter frequencies > supply
- All scores are 0
- Words list is empty
- Some words repeated

### Solution

```python
from collections import Counter

def maxScoreWords(words, letters, score):
    n = len(words)
    letter_count = Counter(letters)
    word_counts = [Counter(word) for word in words]
    word_scores = []
    for word in words:
        s = 0
        for ch in word:
            s += score[ord(ch) - ord('a')]
        word_scores.append(s)
    max_score = 0
    for mask in range(1 << n):
        curr_count = Counter()
        total = 0
        valid = True
        for i in range(n):
            if mask & (1 << i):
                curr_count += word_counts[i]
                total += word_scores[i]
        # Check if curr_count <= letter_count
        for ch in curr_count:
            if curr_count[ch] > letter_count[ch]:
                valid = False
                break
        if valid:
            max_score = max(max_score, total)
    return max_score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ · L) where n is number of words and L is average length per word. Each subset (2ⁿ) builds a letter count (max 26 letters: O(L)), so this is fast for n ≤ 14.
- **Space Complexity:** O(n·L) to store Counter for each word, and O(1) for the letter supply (limited by alphabet size).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize for larger n?  
  *Hint: Branch-and-bound or DP (prune subsets early if not possible, memoize counts and current state).*

- What if you have to output the selected words subset?
  *Hint: Store previous mask or path when updating max_score; reconstruct backward.*

- How would you handle unlimited supply of some letters?
  *Hint: Treat their count as infinite, skip supply check for those letters.*

### Summary
The main idea is subset enumeration with validation, using bitmasking—a critical pattern for problems with small n. This is a classic NP-complete flavor (like Knapsack/Subsets with constraints). Approach and code pattern generalizes to many selection & score-maximization variants.