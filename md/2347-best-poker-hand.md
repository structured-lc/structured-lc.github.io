### Leetcode 2347 (Easy): Best Poker Hand [Practice](https://leetcode.com/problems/best-poker-hand)

### Description  
Given two arrays: **ranks** (for the card numbers/values, e.g. 2–10, J, Q, K, A, represented as integers) and **suits** (for the suits, e.g. 'H', 'D', 'S', 'C'), each array length 5, determine the best possible poker hand you can get from these five cards, using only these simplified poker hands:
- "Flush": All five cards have the same suit.
- "Three of a Kind": At least three cards have the same rank.
- "Pair": At least two cards have the same rank.
- "High Card": None of the above.

You should output the **best possible hand** from these options.

### Examples  

**Example 1:**  
Input: `ranks = [13, 2, 3, 1, 9]`, `suits = ['a', 'a', 'a', 'a', 'a']`  
Output: `Flush`  
*Explanation: All cards are the same suit ("a"), so this is a flush.*

**Example 2:**  
Input: `ranks = [4, 4, 2, 4, 4]`, `suits = ['a', 'b', 'a', 'a', 'c']`  
Output: `Three of a Kind`  
*Explanation: Four cards have rank 4: 4, 4, 4, 4. As soon as there are at least three with same rank, the best non-flush hand is "Three of a Kind".*

**Example 3:**  
Input: `ranks = [10, 10, 2, 12, 9]`, `suits = ['a', 'b', 'c', 'a', 'd']`  
Output: `Pair`  
*Explanation: Two cards with rank 10 form a pair, but no flush and no three of a kind.*

**Example 4:**  
Input: `ranks = [2, 3, 5, 7, 11]`, `suits = ['a', 'b', 'c', 'd', 'e']`  
Output: `High Card`  
*Explanation: No matching suits and no repeat ranks.*

### Thought Process (as if you’re the interviewee)  

Start with the interface: given two arrays, check for the best hand possible.  
Brute-force:  
- First, check if all suits are the same → instantly "Flush".
- If not a flush: count the occurrences of each rank using a frequency array or dictionary.
  - If any rank appears three or more times: "Three of a Kind".
  - If any rank appears exactly twice: "Pair".
  - Otherwise: "High Card".
The flush check is O(1) because of 5 cards. Counting ranks is also O(1). No need for further optimization.

Trade-offs:  
- Dictionary vs array for counting: array of size 14 (since possible ranks are in [1,13]) is most space-efficient for fixed size, avoids hash collision.  
- No need to sort or use advanced data structures; the problem constraints are very tight (always 5 cards).  
- Our approach is optimal for both time and space.

### Corner cases to consider  
- All cards same suit but all distinct ranks (should return "Flush").
- All cards same rank and same suit (should still return "Flush").
- Three, four, or even five cards with the same rank and mixed suits (should return "Three of a Kind").
- Exactly two ranks appear twice each (still just a "Pair").
- No repeated suits or ranks ("High Card").
- The problem constraint guarantees five cards, so no need to consider empty or malformed input.

### Solution

```python
def best_poker_hand(ranks, suits):
    # Check if all suits are the same for a "Flush"
    first_suit = suits[0]
    is_flush = True
    for suit in suits:
        if suit != first_suit:
            is_flush = False
            break
    if is_flush:
        return "Flush"

    # Count the occurrences of each rank for "Three of a Kind" or "Pair"
    rank_count = [0] * 15  # Since ranks can be up to 13, plus extra buffer
    has_pair = False
    for rank in ranks:
        rank_count[rank] += 1
        if rank_count[rank] == 3:
            return "Three of a Kind"
        if rank_count[rank] == 2:
            has_pair = True

    return "Pair" if has_pair else "High Card"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1). Only five cards; all loops and checks run a constant number of times.
- **Space Complexity:** O(1). Extra storage is a fixed-size array for ranks.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if you had N cards instead of always 5?
  *Hint: Discuss efficiency and memory if input grows, and how to generalize the logic.*

- What if the number of suits or ranks is variable or not known in advance?
  *Hint: Would you use a different data structure for counting/finding flushes?*

- Could you extend the problem to full poker hands (e.g., straight, full house, etc.)?
  *Hint: What additional checks/logic would you need?*

### Summary
The approach is a classic "frequency count" plus early-exit property-checking pattern. It's common in problems asking for "best among categories", where you check for the best-case (rarer) conditions first. Simpler patterns like these can be found in small input string/array classification problems, hand evaluation, and survey vote-counting systems.


### Flashcard
Check for flush (all suits same); else, count rank frequencies: ≥3 is "Three of a Kind", 2 is "Pair", else "High Card".

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
- Categorize Box According to Criteria(categorize-box-according-to-criteria) (Easy)