### Leetcode 765 (Hard): Couples Holding Hands [Practice](https://leetcode.com/problems/couples-holding-hands)

### Description  
Given a row of 2N seats, there are N pairs of couples (2N people, labeled 0 through 2N-1). Each couple is defined by consecutive numbers: (0,1), (2,3), (4,5), etc. The people are randomly seated, and your job is to return the **minimum number of swaps required** (any two people can be swapped) so that every couple is seated next to each other.  

A swap consists of picking any two people and having them exchange seats.  

### Examples  

**Example 1:**  
Input: `row = [0, 2, 1, 3]`  
Output: `1`  
*Explanation: Couple (0,1) are not sitting together: 0's partner, 1, is at position 2. Swap 2 and 1 to get [0,1,2,3].*

**Example 2:**  
Input: `row = [3, 2, 0, 1]`  
Output: `0`  
*Explanation: Couples (2,3) and (0,1) are already sitting together: [3,2,0,1]. No swaps needed.*

**Example 3:**  
Input: `row = [5, 4, 2, 6, 3, 1, 0, 7]`  
Output: `2`  
*Explanation: First, swap person at index 3 and 7: [5,4,2,7,3,1,0,6]. Then swap index 2 and 6: [5,4,0,7,3,1,2,6]. Now, all couples are together.*

### Thought Process (as if you’re the interviewee)  
My initial brute-force idea is: Try all possible swaps at every step, but this is infeasible due to factorial time complexity for even small N.

A much better approach:  
- **Observation:** Each couple (numbered i) has members 2i and 2i+1 (i.e., person's partner is always `x ^ 1`).
- For each adjacent *pair* in the row (indices 0&1, 2&3, ...), if they are not a couple, swap one person with their partner elsewhere.
- For every incorrect pair, only a single swap is needed to fix one couple.
- Efficiently, we can loop through the row in steps of 2, and for each pair, check if the `i+1` seat holds the correct partner (`row[i] ^ 1`). If not, find the partner's current position and swap it to `i+1`.

For even better performance, you could use **Union-Find** to model this as counting cycles: the number of cycles in the seating graph determines the answer.

I choose the "greedy" approach of swapping partners into the right position as it's clear, easy to implement, and optimal.

### Corner cases to consider  
- No swaps needed (all couples together).
- All seats reversed (max swaps).
- Minimum size (empty or only one couple).
- Large input for performance.
- Redundant or already-coupled positions.

### Solution

```python
def minSwapsCouples(row):
    # Map each person to their seat index for O(1) lookup
    pos = {person: i for i, person in enumerate(row)}
    swaps = 0
    n = len(row)

    for i in range(0, n, 2):
        first = row[i]
        partner = first ^ 1  # partner is always x ^ 1
        if row[i + 1] != partner:
            # Need to swap row[i + 1] with partner's current position
            partner_index = pos[partner]

            # Swap row[i + 1] and row[partner_index]
            row[i + 1], row[partner_index] = row[partner_index], row[i + 1]

            # Update positions after swap
            pos[row[partner_index]] = partner_index
            pos[row[i + 1]] = i + 1

            swaps += 1

    return swaps
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of people. Each couple is processed once (N/2 iterations), and partner lookups and swaps are O(1) due to the hash map.
- **Space Complexity:** O(N), for the hash map storing current positions.

### Potential follow-up questions (as if you’re the interviewer)  

- What if only adjacent swaps were allowed?  
  *Hint: Think about bubble sort inversion count.*

- Can you solve using Disjoint Set / Union-Find?  
  *Hint: Each cycle in the seat graph corresponds to swaps needed.*

- How would you generalize if there were groups of size K instead of couples?  
  *Hint: How do you partition and find partners in such groupings?*

### Summary
This problem uses the **greedy "put the correct partner in place by swapping" pattern**, leveraging the property that each person's partner is uniquely defined and that swaps can be done anywhere. Maintaining a mapping of current positions enables constant-time swaps, resulting in an efficient O(N) solution. This strategy is common in problems involving "cycle swaps" or "minimum swaps to sort." It also relates to union-find/cycle-decomposition, which appears in problems about grouping or coloring.

### Tags
Greedy(#greedy), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
- First Missing Positive(first-missing-positive) (Hard)
- Missing Number(missing-number) (Easy)
- K-Similar Strings(k-similar-strings) (Hard)