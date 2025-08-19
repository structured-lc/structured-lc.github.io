### Leetcode 950 (Medium): Reveal Cards In Increasing Order [Practice](https://leetcode.com/problems/reveal-cards-in-increasing-order)

### Description  
Given a deck of cards represented as an array of unique integers, you may arrange them in any order. Then, a process is repeatedly performed:  
- Reveal the top card, remove it  
- If cards remain, move the next top card to the bottom of the deck  
- Repeat until all cards are revealed  

The task: **Return an initial ordering of the deck so that, by following this process, the cards are revealed in *increasing* order**.  
The answer should be the arrangement of the deck where the top of the deck is at index 0.

### Examples  

**Example 1:**  
Input: `[17,13,11,2,3,5,7]`  
Output: `[2,13,3,11,5,17,7]`  
*Explanation:*
- Arrange input into `[2,13,3,11,5,17,7]`  
- Reveal 2 → deck: `[13,3,11,5,17,7]`  
- Move 13 to bottom → `[3,11,5,17,7,13]`  
- Reveal 3 → `[11,5,17,7,13]`  
- Move 11 to bottom → `[5,17,7,13,11]`  
- Reveal 5 → `[17,7,13,11]`  
- Move 17 to bottom → `[7,13,11,17]`  
- Reveal 7 → `[13,11,17]`  
- Move 13 to bottom → `[11,17,13]`  
- Reveal 11 → `[17,13]`  
- Move 17 to bottom → `[13,17]`  
- Reveal 13 → ``  
- Reveal 17  
Revealed order: 2,3,5,7,11,13,17

**Example 2:**  
Input: `[1,1000]`  
Output: `[1,1000]`  
*Explanation:*
- Reveal 1 → deck: `[1000]`
- Reveal 1000  
Revealed: 1,1000

**Example 3:**  
Input: `[3,4,5,6,7]`  
Output: `[3,7,4,6,5]`  
*Explanation:*
- Reveal 3 → `[7,4,6,5]`  
- Move 7 to bottom → `[4,6,5,7]`
- Reveal 4 → `[6,5,7]`
- Move 6 to bottom → `[5,7,6]`
- Reveal 5 → `[7,6]`
- Move 7 to bottom → `[6,7]`
- Reveal 6 → ``
- Reveal 7  
Result: 3,4,5,6,7

### Thought Process (as if you’re the interviewee)  

First, let's understand the rule:  
- The deck is "rotated" after each reveal: reveal one, move one to bottom, repeat.

A brute-force approach could be to try all permutations and "reveal" in simulation, but that's clearly impractical for large \(n\), as the number of permutations is n!.

Let's try simulating the process backward:  
- We know the **desired reveal order is sorted(deck)**
- If we try to "reverse" the original process, we can reconstruct the starting order by:
  - For each card from largest to smallest:
    - If any cards are in the constructed deck, take the last (bottom) and move it to the front (top)
    - Insert the new card at the front

Why?  
This mirrors the process in reverse: instead of removing top and rotating, we're adding to the top and "undoing" the bottom-to-top operation.

This is efficient since each operation is O(1) with a deque, and we walk through the deck once.

### Corner cases to consider  
- Deck of length 0 (should return `[]`)
- Deck of length 1 (trivially itself)
- Deck with consecutive numbers
- Deck with large gaps
- Deck already in sorted/reverse order

### Solution

```python
from collections import deque

def deckRevealedIncreasing(deck):
    # Sort the deck so that our reveal order is increasing
    sorted_deck = sorted(deck)
    q = deque()

    # Reconstruct the answer by simulating the process in reverse
    for card in reversed(sorted_deck):
        if q:
            # Move the bottom card to the top
            q.appendleft(q.pop())
        # Place the current card on top
        q.appendleft(card)

    return list(q)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Sorting the deck takes O(n log n), and the reconstruction loop is O(n).
- **Space Complexity:** O(n)  
  Uses a deque of length n for the answer.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if duplicate cards are allowed?  
  *Hint: Consider stable sorting, but the unique-reveal property is key.*

- If you can only use O(1) extra space, can you do this in-place?  
  *Hint: Is there a pattern to reconstruct the reveal order in-place?*

- What if cards must be revealed in decreasing order?  
  *Hint: Reverse the logic, and "backward" simulation order.*

### Summary
This problem uses a **reverse simulation** approach, efficiently constructing the required initial deck configuration by inverting the reveal process. The core coding pattern here uses queues/deques for circular shuffling simulation, and is applicable in a variety of "process reversal" or conveyor-belt style problems. The approach elegantly avoids brute-force permutations and is both efficient and succinct.

### Tags
Array(#array), Queue(#queue), Sorting(#sorting), Simulation(#simulation)

### Similar Problems
