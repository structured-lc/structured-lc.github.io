### Leetcode 1634 (Medium): Add Two Polynomials Represented as Linked Lists [Practice](https://leetcode.com/problems/add-two-polynomials-represented-as-linked-lists)

### Description  
You are given two polynomials represented by singly linked lists sorted in decreasing order by exponent. Each node holds `coefficient` and `power`. Sum these two polynomials and return the result as a new sorted linked list (by power descending), removing any terms with a 0 coefficient.

### Examples  

**Example 1:**  
Input: `poly1 = [(1,2), (2,1), (3,0)], poly2 = [(1,1), (2,0)]`  
Output: `[(1,2), (3,1), (5,0)]`  
*Explanation: 1x²+2x+3 + 1x+2 → 1x²+3x+5.*

**Example 2:**  
Input: `poly1 = [(2,100), (3,2), (1,0)], poly2 = [(1,100), (2,1)]`  
Output: `[(3,100), (3,2), (2,1), (1,0)]`  
*Explanation: 2x¹⁰⁰+3x²+1 + 1x¹⁰⁰+2x → merge each term with same power.*

**Example 3:**  
Input: `poly1 = [(1,3), (-1,1)], poly2 = [(-1,3), (2,1)]`  
Output: `[(1,1)]`  
*Explanation: x³-x + (-x³+2x) → x, 0x³ term is not included in the result.*

### Thought Process (as if you’re the interviewee)  
- Both lists are sorted by power descending.
- We can use a simple merge approach:
  - Walk through both lists simultaneously.
  - Compare current powers in each list.
  - Add coefficients if powers equal, append node if nonzero.
  - Else, add higher power node to result and move forward in that list.
  - Continue until both are exhausted.

### Corner cases to consider  
- Both lists empty (result is empty).
- Resulting coefficient for a term is zero (discard).
- Large exponents, negative coefficients.
- Input lists have different length or powers don't overlap at all.

### Solution

```python
class PolyNode:
    def __init__(self, coefficient=0, power=0, next=None):
        self.coefficient = coefficient
        self.power = power
        self.next = next

def addPoly(poly1, poly2):
    dummy = PolyNode(0,0)
    tail = dummy
    while poly1 and poly2:
        if poly1.power == poly2.power:
            coef_sum = poly1.coefficient + poly2.coefficient
            if coef_sum != 0:
                tail.next = PolyNode(coef_sum, poly1.power)
                tail = tail.next
            poly1 = poly1.next
            poly2 = poly2.next
        elif poly1.power > poly2.power:
            tail.next = PolyNode(poly1.coefficient, poly1.power)
            tail = tail.next
            poly1 = poly1.next
        else:
            tail.next = PolyNode(poly2.coefficient, poly2.power)
            tail = tail.next
            poly2 = poly2.next
    # Append remaining terms
    while poly1:
        tail.next = PolyNode(poly1.coefficient, poly1.power)
        tail = tail.next
        poly1 = poly1.next
    while poly2:
        tail.next = PolyNode(poly2.coefficient, poly2.power)
        tail = tail.next
        poly2 = poly2.next
    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N+M)
  - Each node from both lists processed at most once.
- **Space Complexity:** O(N+M) 
  - For the result list, new nodes created for each unique power.

### Potential follow-up questions (as if you’re the interviewer)  

- What if input polynomials are not sorted?  
  *Hint: You'll need to sort by power first, maybe use a map to group terms.*
- Handle inputs with duplicate powers in the same list?  
  *Hint: Sum like powers as you traverse, perhaps preprocess.*
- What if more than two polynomials?  
  *Hint: Extend merge approach or iteratively add pairs.*

### Summary
This is a textbook pattern for **merging two sorted lists**, adapted for polynomial addition. The same technique can be used for other linear algebra or merging algorithms.

### Tags
Linked List(#linked-list), Math(#math), Two Pointers(#two-pointers)

### Similar Problems
- Add Two Numbers(add-two-numbers) (Medium)
- Merge Two Sorted Lists(merge-two-sorted-lists) (Easy)
- Add Two Numbers II(add-two-numbers-ii) (Medium)