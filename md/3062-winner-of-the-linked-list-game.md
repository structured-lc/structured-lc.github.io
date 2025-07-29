### Leetcode 3062 (Easy): Winner of the Linked List Game [Practice](https://leetcode.com/problems/winner-of-the-linked-list-game)

### Description  
Given a singly linked list, two players ("Odd" and "Even") play a game by drawing numbers from the list alternately in pairs. For every pair of consecutive nodes:
- The "Odd" player takes the first node's value, and the "Even" player takes the second node's value.
- Whichever player has the higher value in the pair earns a point.
- If both values are equal, neither earns a point.
At the end, return "Odd" if the Odd player has more points, "Even" if Even has more, or "Tie" if both have equal points.

### Examples  

**Example 1:**  
Input: `head = [2,1]`  
Output: `Even`  
*Explanation: There is one pair: (2,1). Since 2 > 1, Even earns a point. Final scores: Odd=0, Even=1.*

**Example 2:**  
Input: `head = [1,3,2,2]`  
Output: `Even`  
*Explanation:  
Pair 1: (1,3): 3 > 1, Even scores 1.  
Pair 2: (2,2): same, no points.  
Final: Odd=0, Even=1.*

**Example 3:**  
Input: `head = [4,5,2,1]`  
Output: `Even`  
*Explanation:  
Pair 1: (4,5): 5 > 4, Even scores 1.  
Pair 2: (2,1): 2 > 1, Odd scores 1.  
It's a tie: Odd=1, Even=1.*

### Thought Process (as if you’re the interviewee)  
First, simulate the game by traversing the list in pairs. In each step, compare the values (odd-indexed vs even-indexed).  
- Add 1 to Odd if Odd's value > Even's value, and 1 to Even if Even's value > Odd's value.  
- If values are equal, both get 0.  
Edge case: The list must have even length since each round takes two nodes.  
Brute-force and optimal solutions are the same: simply iterate in O(n), with O(1) extra space.  
Trade-offs: This is the optimal approach; nothing faster or lighter is possible here.

### Corner cases to consider  
- Empty list: return "Tie".  
- List with only one node: no valid pairs, return "Tie".  
- Odd-length list: ignore last node, since it can't form a pair.  
- All node values are equal: always "Tie".  
- All pairs result in tied values.

### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def gameResult(head: ListNode) -> str:
    # Initialize scores
    odd_score = 0
    even_score = 0
    
    # Traverse two nodes at a time
    curr = head
    while curr and curr.next:
        first = curr.val       # Odd player's pick
        second = curr.next.val # Even player's pick
        if first > second:
            odd_score += 1
        elif first < second:
            even_score += 1
        # If equal, no points to anyone
        curr = curr.next.next  # Move to next pair

    # Decide the winner
    if odd_score > even_score:
        return "Odd"
    elif even_score > odd_score:
        return "Even"
    else:
        return "Tie"
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes. We traverse the whole list once, processing each pair.
- **Space Complexity:** O(1), since we only use fixed variables for scores and node pointers, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the linked list can have odd length?  
  *Hint: Should the last node be ignored or treated as a special case?*

- How would you solve this problem if the input was an array instead of a linked list?  
  *Hint: You could use range(0, len(nums)-1, 2) to step through in pairs.*

- Could you return the scores for both players, not just the winner?  
  *Hint: Return a tuple (odd_score, even_score) instead of just the winner string.*

### Summary
This problem uses the **pairwise traversal** and **counter update** coding patterns. It demonstrates how linked list traversal logic can parallel array logic with proper pointer care. The main approach—iterative simulation—is commonly used in problems asking for processing nodes in pairs, such as for parsing, pairing, or competition tasks.