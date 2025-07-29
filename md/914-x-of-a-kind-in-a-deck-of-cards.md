### Leetcode 914 (Easy): X of a Kind in a Deck of Cards [Practice](https://leetcode.com/problems/x-of-a-kind-in-a-deck-of-cards)

### Description  
Given a list where each element represents a card (by integer face value), determine if it's possible to partition the deck into groups of the same size (*at least 2 per group*) such that:
- Each group contains the **same number of cards**.
- All cards in a group have the **same value**.

In other words, can you choose an integer x ≥ 2 so that the deck can be split into groups of size x, with each group having identical face values?

### Examples  

**Example 1:**  
Input: `[1,2,3,4,4,3,2,1]`  
Output: `True`  
*Explanation: Count of each card is: 1→2, 2→2, 3→2, 4→2. All counts are 2, so the whole deck can be split into groups of 2 where each group has the same value.*

**Example 2:**  
Input: `[1,1,1,2,2,2,3,3]`  
Output: `False`  
*Explanation: Counts are: 1→3, 2→3, 3→2. The GCD of counts (3,3,2) is 1, so we can't split into groups of size ≥2.*

**Example 3:**  
Input: `[1,1]`  
Output: `True`  
*Explanation: Both cards are 1, so group size x=2 works (one group of two).*

### Thought Process (as if you’re the interviewee)  
Start by counting the occurrences of each unique card value.  
To split into equal groups of x ≥ 2 where each group has the *same number* and the *same face value*, the **count of every card** must be divisible by x.  
The largest such x that works is the greatest common divisor (GCD) of all card counts.  
- If GCD ≥ 2, then group size x = GCD works, so return True.  
- Otherwise, return False.

Why is this optimal? Calculating the GCD of all counts gives the largest possible group size for which every card's count is divisible, satisfying group requirements.

### Corner cases to consider  
- Empty deck or deck size 1 (should return False, as no group of size ≥2 is possible)
- All cards of the same value
- Deck where all values have different counts
- Deck where GCD is precisely 2 (minimal valid group size)
- Large numbers of repeated cards

### Solution

```python
def hasGroupsSizeX(deck):
    # Step 1: Count how many times each value appears
    counts = {}
    for card in deck:
        if card in counts:
            counts[card] += 1
        else:
            counts[card] = 1

    # Step 2: Find the GCD of all counts
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    all_counts = list(counts.values())
    group_size = all_counts[0]
    for count in all_counts[1:]:
        group_size = gcd(group_size, count)

    # Step 3: If the GCD ≥ 2, can split accordingly
    return group_size >= 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the size of the deck. We count frequencies (O(n)), then compute GCD across (at most) n/2 unique values.
- **Space Complexity:** O(n), in the worst case where all cards are unique.

### Potential follow-up questions (as if you’re the interviewer)  

- What if cards can be grouped even if their values differ, as long as group sizes are equal?  
  *Hint: Consider relaxing the "same value" requirement and focus on just group sizes.*
  
- How to handle huge decks efficiently if deck size is 10^6?  
  *Hint: Is there a way to process counts without storing everything in memory? Maybe use generators or count streaming?*

- Can you implement this for a deck of strings or objects instead of integers?  
  *Hint: Focus on counting by hashable representation, not just numeric.*

### Summary
This is a classic **frequency grouping** and **GCD** pattern. Any problem where elements must be partitioned into equal groups based on counts tends to use the GCD trick.  
This approach is common in combinatorics and grouping or bucket problems, and is highly scalable and efficient for such scenarios.