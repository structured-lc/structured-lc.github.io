### Leetcode 2105 (Medium): Watering Plants II [Practice](https://leetcode.com/problems/watering-plants-ii)

### Description  
Given an array of n plants, each requiring a specific amount of water, two people (Alice and Bob) each start at opposite ends of the row. Alice starts at plant 0 and goes right, Bob at plant n-1 and goes left. Each has a watering can with its own initial capacity. If either doesn't have enough water for the current plant, they must refill (instantly) before watering. If both reach the same plant, the one with more water in their can waters it (Alice wins ties). Return the total number of refills required for all plants.

### Examples  

**Example 1:**  
Input: `plants = [2,4,5,1,2], capacityA = 5, capacityB = 7`  
Output: `2`  
*Explanation: Alice (5 units), Bob (7 units).  
- Alice waters plant 0 (needs 2, left: 3).  
- Bob waters plant 4 (needs 2, left: 5).  
- Alice: plant 1 (needs 4, not enough, refills to 5, waters, left: 1).  
- Bob: plant 3 (needs 1, left: 4).  
- Middle plant left: Alice (1), Bob (4). Bob has more so waters plant 2 (needs 5, not enough, refills to 7, waters, left: 2).  
Total refills: Alice (1), Bob (1) ⇒ 2.*  

**Example 2:**  
Input: `plants = [2,2,3,3], capacityA = 5, capacityB = 5`  
Output: `1`  
*Explanation:  
- Alice waters 0 (3 left), Bob waters 3 (2 left).  
- Alice waters 1 (1 left), Bob waters 2 (needs 3, not enough, refills, left: 2).  
Total refills: 1 (by Bob).*

**Example 3:**  
Input: `plants = [5], capacityA = 10, capacityB = 8`  
Output: `0`  
*Explanation:  
- Only one plant, Alice starts with more water, she waters it without refilling. Total refills: 0.*

### Thought Process (as if you’re the interviewee)  
Start by simulating Alice and Bob moving towards each other with two pointers:
- Alice starts at the left (i = 0), Bob at right (j = n-1), both with a and b units of water.
- At each step, check if they have enough water. If not, refill and increment the refill counter.
- If i == j (they meet), whoever has more water goes (Alice in a tie).
- Brute-force is fine for small n (n ≤ 10⁴), O(n) time is acceptable.
- This is best done with two pointers and variables tracking current water.  
Final approach is a straightforward simulation since all steps are O(1).

### Corner cases to consider  
- n = 1 (single plant)
- capacities larger, smaller, or equal to plant requirements
- plants with requirement equal to capacity
- plants with requirement bigger than capacity (shouldn't occur per constraints)
- both meet in the middle (for odd n)
- refill required at the very start

### Solution

```python
def minimumRefill(plants, capacityA, capacityB):
    # i: Alice's index, j: Bob's index
    # a: current water in Alice's can, b: for Bob
    i, j = 0, len(plants) - 1
    a, b = capacityA, capacityB
    refills = 0

    while i < j:
        # Alice's turn
        if a < plants[i]:
            refills += 1
            a = capacityA
        a -= plants[i]
        i += 1

        # Bob's turn
        if b < plants[j]:
            refills += 1
            b = capacityB
        b -= plants[j]
        j -= 1

    # If odd number of plants, handle the middle one
    if i == j:
        if max(a, b) < plants[i]:
            refills += 1
        # Otherwise, whoever has more waters (Alice on tie), no refill needed

    return refills
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of plants. Each plant is watered exactly once, and each pointer (i and j) moves at most n steps.
- **Space Complexity:** O(1), no extra data structures used except basic variables.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose plant water needs or watering can capacities are much larger.  
  *Hint: What if plant[] or capacities fit in 64-bit ints, would you change your code?*

- If watering cans could only be refilled at the starting points (not anywhere), how would the logic change?  
  *Hint: Must plan round-trips to refill, so precompute furthest plant watered per fill.*

- Return not just the number of refills, but also which person watered each plant.  
  *Hint: Store the history, especially for the middle plant.*

### Summary
We used a two-pointer simulation—a classic interview technique for problems where two agents work from opposite ends with local state. This technique is common in greedy, partitioning, or pairing problems. The solution pattern applies in any task where actions from both sides converge on a middle, such as merging, scheduling, or symmetric updates.

### Tags
Array(#array), Two Pointers(#two-pointers), Simulation(#simulation)

### Similar Problems
- Watering Plants(watering-plants) (Medium)