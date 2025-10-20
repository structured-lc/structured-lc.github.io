### Leetcode 843 (Hard): Guess the Word [Practice](https://leetcode.com/problems/guess-the-word)

### Description  
You are given a list of unique six-letter words. Hidden among them is a secret word. You can make guesses by calling an API (often provided via a `master.guess(word)` function). This function returns the number of exact matches (same letter, same position) between your guess and the secret word, or -1 if your guess is not part of the list. You have up to 10 guesses to find the secret word. After each guess, you use the number of matches to filter out impossible candidates. Your task is to find the strategy that guarantees finding the secret within these 10 guesses[1][2].

### Examples  

**Example 1:**  
Input: `wordlist = ["acckzz", "ccbazz", "eiowzz", "abcczz"]`, secret=`"acckzz"`  
Output: *After guesses: "eiowzz" ⟶ 3, "acckzz" ⟶ 6*  
Explanation. After guessing "eiowzz", suppose master returns 3 matches. You then filter wordlist to only those with 3 matches to "eiowzz" (could be "acckzz" and "abcczz"). Next, guessing "acckzz" yields 6 matches (all correct), so the secret is found[1][2].

**Example 2:**  
Input: `wordlist = ["abcdef", "xbcdef", "ybcdef", "abcdeg"]`, secret=`"abcdef"`  
Output: *Guesses: "xbcdef" ⟶ 5, "abcdeg" ⟶ 5, "abcdef" ⟶ 6*  
Explanation. Each guess yields the number of matching positions, allowing you to gradually filter out invalid words.

**Example 3:**  
Input: `wordlist = ["aaaaaa", "bbbbbb", "cccccc", "dddddd"]`, secret=`"bbbbbb"`  
Output: *First guess: "cccccc" ⟶ 0, then "bbbbbb" ⟶ 6*  
Explanation. If you guess "cccccc" and find 0 matches, you can eliminate all candidates except "bbbbbb" and "dddddd", then quickly find the answer.

### Thought Process (as if you’re the interviewee)  

First, the brute-force approach is:  
- For each guess, use master.guess and filter out words that wouldn't have produced that match count.  
- This works, but with random guessing, you can get stuck with too many options before 10 guesses[1][3].

To improve:  
- After each guess, only keep words in your candidate list that match the exact number of matches with the guessed word as returned by the master[1][3].
- However, randomly picking a word to guess each time may not be efficient.

The optimization is:
- For each possible next guess, evaluate the "worst-case" size of the filtered candidate list after making that guess — i.e., for a given guess word, for all possible `number of match` outcomes (0–6), what’s the size of the largest remaining group?  
- Pick the word that minimizes this worst-case group size. This is called a Minimax approach, and helps guarantee that the candidate list shrinks as much as possible, regardless of the guess feedback[3].

This is necessary since our guess count is capped at 10. We want to make each guess as informative as possible.

### Corner cases to consider  
- The secret word is at the end of the candidate elimination order.
- All words in list are very similar — lots of overlap, hard to differentiate.
- All candidate words are very different — each guess gives maximal information.
- Words list is empty or has only one word (trivial case).
- Repeatedly guessing the same word (should not happen).
- No possible candidates left after too many mismatches (implementation bug).

### Solution

```python
# Assume master.guess(word) is available and returns # of exact matches to secret

def findSecretWord(wordlist, master):
    from collections import Counter, defaultdict

    def match(w1, w2):
        return sum(c1 == c2 for c1, c2 in zip(w1, w2))

    n = len(wordlist[0])  # length of words

    candidates = wordlist[:]
    for _ in range(10):  # Max 10 guesses
        # Minimax: choose guess that minimizes the largest possible group in worst outcome
        min_max_group = float('inf')
        guess_word = candidates[0]
        for w in candidates:
            # Count how many words have 0, 1, ... n matches with w
            groups = [0] * (n + 1)
            for x in candidates:
                if x == w: continue
                groups[match(w, x)] += 1
            max_group = max(groups)
            if max_group < min_max_group:
                min_max_group = max_group
                guess_word = w

        matches = master.guess(guess_word)
        if matches == n:
            return  # Found secret!

        # Filter candidates: only keep words with same # of matches to guess_word
        candidates = [w for w in candidates if match(guess_word, w) == matches]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(10 × n × m²), where `m` = #words, `n` = word length.  
    - For each guess (up to 10), for every candidate word, we compare against all others (O(m²)), and each comparison costs O(n)[3].
- **Space Complexity:** O(m), mainly for storing the candidate list and grouping information.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you scale the solution if the wordlist were much larger?
  *Hint: Efficiently reducing search space, parallelizing match calculation.*

- Could you introduce probabilistic guessing? 
  *Hint: Use information theory or probabilities derived from character positions.*

- What changes if words have varying lengths?
  *Hint: Generalize `match` function and candidate filtering logic.*

### Summary
This problem uses the **Minimax/Information-based Guess Reduction** pattern — commonly seen in games such as Mastermind. The crucial idea is to make guesses that guarantee the maximal elimination of candidates regardless of the feedback, especially under guess-count constraints. This pattern is helpful in adversarial guessing, games, and search problems where the worst-case scenario must be minimized.


### Flashcard
After each guess, filter word list to those matching the same number of positions; use minimax or frequency heuristics to pick next guess.

### Tags
Array(#array), Math(#math), String(#string), Interactive(#interactive), Game Theory(#game-theory)

### Similar Problems
