### Leetcode 846 (Medium): Hand of Straights [Practice](https://leetcode.com/problems/hand-of-straights)

### Description  
You are given a list of integers representing cards in a hand. Your task is to determine if it is possible to rearrange all the cards into groups of size `groupSize`, where each group consists of consecutive cards. Each card must be used exactly once, and each group must have exactly `groupSize` consecutive values. For example, if the `hand` is `[1,2,3,6,2,3,4,7,8]` and the `groupSize` is `3`, then possible groups are `[1,2,3]`, `[2,3,4]`, and `[6,7,8]`.

### Examples  

**Example 1:**  
Input: `hand = [1,2,3,6,2,3,4,7,8]`, `groupSize = 3`  
Output: `True`  
*Explanation: The hand can be rearranged into groups: [1,2,3], [2,3,4], [6,7,8]. All groups contain 3 consecutive cards.*

**Example 2:**  
Input: `hand = [1,2,3,4,5]`, `groupSize = 4`  
Output: `False`  
*Explanation: The hand size is 5, and cannot be rearranged fully into groups of 4 consecutive cards since 5 is not a multiple of 4.*

**Example 3:**  
Input: `hand = [8,10,12]`, `groupSize = 3`  
Output: `False`  
*Explanation: The only possible group ([8,10,12]) is not consecutive. There is no way to partition the hand into groups of 3 consecutive numbers.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach would try to consider every possible grouping, but this is infeasible for large hands.
- Instead, observe that we need to form as many consecutive groups of length `groupSize` as possible, always starting from the lowest card available.
- Count the frequency of each card using a hashmap or counter.
- Sort the hand in ascending order.
- For each card in the sorted hand:
  - If the card is still unused, try to form a group of size `groupSize` starting with this card.
  - For each card in the sequence (`currentCard`, ..., `currentCard + groupSize-1`):
    - If the card is not available, return False.
    - Otherwise, decrease its count. If a card’s count hits 0, remove it from the count.
- If all cards are consumed successfully, return True.
- This approach prevents trying all combinations and greedily always starts building sequences from the smallest available number, which prevents overlaps and ensures coverage.

### Corner cases to consider  
- Empty input hand, e.g., `hand=[]`
- `groupSize = 0` or `groupSize = 1`
- Hand where the number of cards is not divisible by `groupSize`
- Duplicate elements (multiple equal cards)
- All cards identical, but groupSize > 1
- Very large numbers and negatives (if they are possible per constraints)
- Cards that cannot be grouped due to missing elements in sequence (holes)

### Solution

```python
def isNStraightHand(hand, groupSize):
    # If there aren't enough cards to form groups, return False early
    if len(hand) % groupSize != 0:
        return False

    # Count frequency of each card
    count = {}
    for card in hand:
        count[card] = count.get(card, 0) + 1

    # Sort unique cards to always start groups from the smallest value
    sorted_hand = sorted(count.keys())

    for card in sorted_hand:
        while count.get(card, 0) > 0:
            # Form a group starting from this card
            # Each group must contain groupSize consecutive cards
            for offset in range(groupSize):
                next_card = card + offset
                if count.get(next_card, 0) <= 0:
                    return False
                count[next_card] -= 1
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N log N), where N is the number of cards in the hand. This is due to sorting. The grouping and count updates run in O(N) over all cards.
- **Space Complexity:** O(N), for storing card frequencies and temporary counters, proportional to the number of unique cards.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the hand had millions of cards—can your solution scale?
  *Hint: What is the bottleneck in your current approach; can you avoid sorting or optimize the count lookups?*

- Can you handle the logic without sorting the hand?
  *Hint: If you use a more sophisticated data structure (like a balanced BST), can you maintain a sorted order dynamically?*

- What would change if, instead of "consecutive numbers," the groups must be increasing by 2 or by k?
  *Hint: How would changes to the consecutive constraint alter your loops?*

### Summary
This problem is a **Greedy + Hashmap** pattern, where we greedily match the smallest available card into consecutive groups using a frequency map. Sorting ensures we always process in order without missing any possible required sequence. This pattern occurs in problems involving multiset grouping, consecutive intervals, and is related to the "sweep line" and "multiset simulation" family of problems.


### Flashcard
Count each card, sort hand, and for each lowest unused card, try to form group of groupSize consecutive cards by decrementing counts.

### Tags
Array(#array), Hash Table(#hash-table), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
