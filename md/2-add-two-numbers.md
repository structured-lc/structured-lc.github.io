### Leetcode 2 (Medium): Add Two Numbers [Practice](https://leetcode.com/problems/add-two-numbers)

### Description  
Given two non-empty linked lists representing two non-negative integers, each node contains a single digit, and the digits are stored in **reverse order** (i.e., the 1’s digit is at the head). Add the two numbers and return the sum as a linked list, also in reverse order. Each node must contain a single digit (0-9). If there is a carry-over after the final digit, append a new node with the carry digit.

### Examples  

**Example 1:**  
Input: `l1 = [2,4,3], l2 = [5,6,4]`  
Output: `[7,0,8]`  
*Explanation: The numbers are 342 + 465 = 807; sum in reverse as [7,0,8].*

**Example 2:**  
Input: `l1 = , l2 = `  
Output: ``  
*Explanation: Both numbers are 0; sum is 0.*

**Example 3:**  
Input: `l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]`  
Output: `[8,9,9,9,0,0,0,1]`  
*Explanation: 9999999 + 9999 = 10009998; sum in reverse as [8,9,9,9,0,0,0,1].*


### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  - Convert both linked lists to integers, sum, then reconstruct the result as a new list.  
  - Downside: Handling of very large numbers leads to integer overflow; not practical for linked list structure.

- **Optimal Approach:**  
  - Process both lists **digit by digit**, mimicking elementary addition.
  - Use a carry variable to track overflow at each sum position.
  - Create a new linked list as you go, appending the current digit of the sum.
  - Use a dummy node to simplify handling the result's head.
  - Continue addition until both lists are exhausted **and** the carry is zero.
  - Handles lists of **unequal length** without extra checks, padding as needed with zero for missing nodes[1][2][3].

- **Trade-offs:**  
  - No need to convert to numbers; O(1) per digit addition, O(max(M, N)) memory for result.
  - Linear time-space complexity, no hidden extra cost.


### Corner cases to consider  
- Input lists of **unequal lengths** (e.g., l1 longer than l2)
- **Carry after final nodes** (e.g., 5+5=10)
- Lists with all zeros
- Empty input list (shouldn’t happen per problem, but best to handle)
- Single-node inputs


### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1, l2):
    # Dummy node to simplify head logic
    dummy = ListNode()
    curr = dummy
    carry = 0

    while l1 or l2 or carry:
        # Get values from current nodes, or 0 if node is absent
        v1 = l1.val if l1 else 0
        v2 = l2.val if l2 else 0

        # Compute sum and carry
        total = v1 + v2 + carry
        carry = total // 10
        val = total % 10

        # Create new node for the digit
        curr.next = ListNode(val)
        curr = curr.next

        # Advance l1 and l2
        if l1: l1 = l1.next
        if l2: l2 = l2.next

    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(max(M, N))  
  Where M and N are the lengths of the input lists. We process each node exactly once.
- **Space Complexity:** O(max(M, N))  
  Because the result list is at most one node longer than the longer input (if there’s a carry at the end). Only a few variables used otherwise.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if the digits were stored **in forward order** instead of reverse?  
  *Hint: Need to reverse inputs or use stacks to process digits from least significant.*

- What if the input lists could be **very, very long** (streaming)?  
  *Hint: Process as digits arrive, just like this, but think about state persistence.*

- Could you implement the sum **in place**, reusing nodes from input lists?  
  *Hint: Mutate one of the lists as result, careful with pointers and edge cases!*


### Summary
This problem is a classic example of simulating **elementary digit-by-digit addition** using a linked list structure and a **carry** variable, a very common coding pattern. The use of a dummy node for result assembly is standard in linked list problems. The approach generalizes to related problems (e.g., adding numbers with digits in forward order, merging lists, arithmetic with linked lists) and shows up in several variants throughout linked list exercises.


### Flashcard
Traverse both linked lists digit by digit, summing with carry and building a new list node by node.

### Tags
Linked List(#linked-list), Math(#math), Recursion(#recursion)

### Similar Problems
- Multiply Strings(multiply-strings) (Medium)
- Add Binary(add-binary) (Easy)
- Sum of Two Integers(sum-of-two-integers) (Medium)
- Add Strings(add-strings) (Easy)
- Add Two Numbers II(add-two-numbers-ii) (Medium)
- Add to Array-Form of Integer(add-to-array-form-of-integer) (Easy)
- Add Two Polynomials Represented as Linked Lists(add-two-polynomials-represented-as-linked-lists) (Medium)
- Double a Number Represented as a Linked List(double-a-number-represented-as-a-linked-list) (Medium)