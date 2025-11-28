### Leetcode 2807 (Medium): Insert Greatest Common Divisors in Linked List [Practice](https://leetcode.com/problems/insert-greatest-common-divisors-in-linked-list)

### Description  
Given the head of a singly linked list with integer values, insert a new node between every pair of adjacent nodes. The new node’s value should be the greatest common divisor (GCD) of the values of its two neighboring nodes. The operation must be performed in-place, and the modified head of the list should be returned.  
You only need to consider adjacent pairs; for a list of length 1, do nothing.

### Examples  

**Example 1:**  
Input: `[18, 6, 10, 3]`  
Output: `[18, 6, 6, 2, 10, 1, 3]`  
*Explanation:*
- GCD(18, 6) = 6 inserted between 18 and 6  
- GCD(6, 10) = 2 inserted between 6 and 10  
- GCD(10, 3) = 1 inserted between 10 and 3

The list transforms as:  
```
[18,  6, 10,  3]
   |   |   |
   6   2   1
↓
[18, 6, 6, 2, 10, 1, 3]
```

**Example 2:**  
Input: ``  
Output: ``  
*Explanation:*
- Only 1 node, so nothing is inserted.

**Example 3:**  
Input: `[1, 4, 3, 8]`  
Output: `[1, 1, 4, 1, 3, 1, 8]`  
*Explanation:*
- GCD(1, 4) = 1;  
- GCD(4, 3) = 1;  
- GCD(3, 8) = 1;  

Inserted after every pair, so the result is  
```
[1,  4,  3,  8]
 |   |   |
 1   1   1
↓
[1, 1, 4, 1, 3, 1, 8]
```


### Thought Process (as if you’re the interviewee)  
- The key is to iterate through the linked list for each pair of adjacent nodes.
- For every node with a next node, compute the GCD between them.
- Insert a new node with that GCD value between current and next.
- Move to the next original node and repeat.
- Brute-force is okay: the traversal is O(n) since each insertion is O(1) and each node is only visited once.
- We'll need a helper to compute GCD (using Euclidean algorithm), since we shouldn’t use library functions in real interviews.
- Edge cases: Only one node (do nothing), empty list (do nothing), all equal nodes (GCD will be the node value).

Why is this efficient?  
- There’s no backtracking, recursion, or seeking; all work is done in a single forward traversal.
- The only additional storage is for new nodes.

### Corner cases to consider  
- Empty list (`head` is None)
- Single element list
- List with all identical elements
- Adjacent pairs with GCD 1
- Very large values (test correctness of GCD implementation)
- Negative values (Standard GCD definitions assume non-negatives; if negative, GCD should behave as for positive numbers.)
- List ends immediately after head (two nodes total)

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def insertGreatestCommonDivisors(head: 'ListNode') -> 'ListNode':
    # Helper using Euclidean algorithm for GCD (no library)
    def gcd(a, b):
        a, b = abs(a), abs(b)
        while b != 0:
            a, b = b, a % b
        return a

    current = head
    while current and current.next:
        # Compute GCD of current and next node values
        g = gcd(current.val, current.next.val)
        # Insert new node with GCD between current and current.next
        new_node = ListNode(g, current.next)
        current.next = new_node
        # Skip to next original node (after the one we just inserted)
        current = new_node.next
    return head
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
  - Each node is visited once, and for each pair, GCD computation (which is O(log min(a, b))) is done.
  - All work is done in a single forward pass through the list.
- **Space Complexity:** O(1) extra space
  - Only a constant amount of space is used regardless of input size (excluding new nodes, which are required per problem statement).
  - No recursion or large auxiliary storage used.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt the solution if you may only use constant space and must not modify the original list?
  *Hint: Consider creating a new list while traversing the original.*

- Could you perform this in-place if the list was doubly linked?
  *Hint: You can exploit the prev pointers for back-inserting if needed, but algorithmic logic doesn’t really change here.*

- How does your solution handle negative integers, and should GCD for negative numbers be defined differently?
  *Hint: According to math convention, GCD is always non-negative, and you can use absolute values.*

### Summary
This problem uses the classic **linked list traversal with in-situ node insertion** pattern.  
It’s a straightforward example of single-pass manipulation with O(n) time and O(1) space.  
The pattern of “scan, compute, insert between” is common in problems involving local pairwise operations in linked list or array structures (e.g., merging nodes, splitting nodes, or interleaving operations).
No advanced data structures or recursion needed. The Euclidean GCD computation is a basic number theory trick often useful in these pairwise math scenarios.


### Flashcard
Traverse linked list, compute GCD of each adjacent pair using Euclidean algorithm, insert new node with GCD value between them.

### Tags
Linked List(#linked-list), Math(#math), Number Theory(#number-theory)

### Similar Problems
- Reverse Linked List(reverse-linked-list) (Easy)