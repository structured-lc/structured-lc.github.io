### Leetcode 3664 (Medium): Two-Letter Card Game [Practice](https://leetcode.com/problems/two-letter-card-game)

### Description  
You are given a deck of cards, where each card has two lowercase letters (e.g. "ab", "bb", "ca"). You are also given a character X. The game rules are as follows:  
- Start with 0 points.  
- On each turn, you must select two **compatible** cards containing at least one X (in either the 1ˢᵗ or 2ⁿᵈ letter on each card).  
- Two cards are considered **compatible** if they differ in exactly **one** position (i.e., one character matches and the other is different).  
- Remove both cards from the deck and earn 1 point.  
- The game ends when you cannot select any more compatible pairs containing X.  
Return the **maximum possible score** (total points) you can earn by playing optimally.

### Examples  

**Example 1:**  
Input: `cards = ["ab", "bb", "ba"], X = 'b'`  
Output: `1`  
*Explanation: The only cards with 'b' are "ab", "bb", "ba". The only compatible pair is ("ab", "bb") or ("ba", "bb"), since they differ at only one position (second letter). After using that pair, only one "ba" or "ab" remains, which can't be paired again.*

**Example 2:**  
Input: `cards = ["xy", "yx", "xx", "yy"], X = 'x'`  
Output: `2`  
*Explanation: All cards except "yy" contain 'x'. Compatible pairs: ("xy", "xx") and ("yx", "xx"). After two pairs are used, no further compatible pairs possible.*

**Example 3:**  
Input: `cards = ["aa","ab","ba","bb"], X = 'a'`  
Output: `2`  
*Explanation: Cards with ‘a’ are: "aa", "ab", "ba". Compatible pairs: ("aa","ab") and ("aa","ba") or ("ab","ba"). Two points possible by pairing optimally.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  - For all cards containing X, try every pair to see if they differ at exactly one position, count pairs, remove, repeat.  
  - This is extremely inefficient, especially since for each turn, we'd need to recompute compatible pairs after removal. 

- **Optimize:**  
  - Since each card is two letters, there are at most \(26 \times 26\) possible different cards.
  - Let's group cards with X at the first position and X at the second position.
  - For each group, count the cards.  
  - Count how many cards can make a pair by differing at one index:
    - For each card `s1`, look for card `s2` such that one letter matches (must be X), the other differs.
  - Can precompute frequency for each card and their compatible partners.
  - Since picking pairs removes both, pairing up the compatible cards is a matching problem.
  - Total pairs is minimum of compatible pairs available (since each pair removes two cards).

- **Why final approach?**
  - Optimal group and pairing count avoids repeated work and ensures O(n) with small constant due to the alphabet size.

### Corner cases to consider  
- Empty card deck
- No cards containing X at all (return 0)
- Cards repeated multiple times (e.g. ["ab", "ab", "ab"], X = 'a')
- All cards identical
- All cards incompatible (no valid pairs)
- Only one card with X
- Multiple pairs possible, but forced removals block further pairs

### Solution

```python
def max_score(cards, X):
    # Filter cards containing X
    valid = [card for card in cards if X in card]
    
    # Frequency counter for each card
    freq = {}
    for card in valid:
        freq[card] = freq.get(card, 0) + 1
    
    res = 0
    # For each card, look for compatible pairs
    for card in freq:
        # Try changing first letter
        for c in 'abcdefghijklmnopqrstuvwxyz':
            if c == card[0]:
                continue
            s = c + card[1]
            if X in s and s in freq:
                # Pair as much as possible
                pairs = min(freq[card], freq[s])
                res += pairs
                freq[card] -= pairs
                freq[s] -= pairs
        # Try changing second letter
        for c in 'abcdefghijklmnopqrstuvwxyz':
            if c == card[1]:
                continue
            s = card[0] + c
            if X in s and s in freq:
                pairs = min(freq[card], freq[s])
                res += pairs
                freq[card] -= pairs
                freq[s] -= pairs
    # Each pair counted twice, so divide by 2
    return res // 2
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n + α²), where n = number of cards, α = alphabet size (26):  
    - Filtering is O(n)
    - For each unique card, try changing both letters × 25 options × possible frequencies, but total possible cards is 26² = 676.
    - So overall O(n + α²).
- **Space Complexity:**  
  - O(α²) for frequency map; O(n) for filtered cards.

### Potential follow-up questions (as if you’re the interviewer)  

- What if cards now contain more than two letters?
  *Hint: Generalize compatible logic to “differ in exactly one position” for k-letter cards.*

- How do you handle multiple queries for different X values efficiently?
  *Hint: Preprocess frequency map and compatible mapping for all possible X.*

- How can you modify the solution to support case-sensitive or Unicode characters?
  *Hint: Change alphabet range, and adapt mapping steps with more general sets.*

### Summary
This problem elegantly uses the **frequency counting and pairing/matching pattern**, exploiting the small search space for two-letter words and the matching-by-difference constraint.  
The approach is similar to grouping and pairing tasks found in anagrams or pattern-matching problems, and it can be adapted for other settings with "differ in exactly one position" logic.

### Tags

### Similar Problems
