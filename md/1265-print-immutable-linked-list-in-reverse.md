### Leetcode 1265 (Medium): Print Immutable Linked List in Reverse [Practice](https://leetcode.com/problems/print-immutable-linked-list-in-reverse)

### Description  
You are given an **immutable singly linked list** (nodes cannot be modified and you can't access previous nodes once traversed). Each node has the following interface:
- `printValue()` to print its value
- `getNext()` to get the next node (returns another node or null)

Your task is to **print all values from tail to head** (reverse order). You must use only the methods provided; you cannot change node values, use extra data members in nodes, or reverse the list structure.

### Examples  
**Example 1:**  
Input: `head = [1,2,3,4]`  
Output: `4 3 2 1`
*Explanation: Original list is 1→2→3→4. Output must print values from last to first.*

**Example 2:**  
Input: `head = [7,9,6]`  
Output: `6 9 7`
*Explanation: Original list is 7→9→6. Output is in reverse order.*

**Example 3:**  
Input: `head = []`  
Output: ` `
*Explanation: List is empty; nothing should be printed.*

### Thought Process (as if you’re the interviewee)  
Because the linked list is immutable, I can't reverse it or set pointers. The only way to print in reverse is:
- **Use recursion:** Traverse until the end, then print on stack unwinding
- **Alternative:** Store nodes in a stack as I traverse
Recursion is direct and space is O(N) due to the call stack. Since we only get one getNext() per traversal, both recursion and explicit stack use the same idea: traverse forwards, print backwards.

### Corner cases to consider  
- List is empty (no nodes): nothing to print
- List has a single node: only one value to print
- Very long list (to check stack overflow concerns)

### Solution

```python
# Assume ImmutableListNode class is provided with:
#   - printValue()
#   - getNext()
def printLinkedListInReverse(head):
    # Recursive helper to print in reverse
    if head is not None:
        printLinkedListInReverse(head.getNext())
        head.printValue()
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N) — Each node is visited once
- **Space Complexity:** O(N) — Either recursion stack or stack for values

### Potential follow-up questions (as if you’re the interviewer)  
- What if the linked list is extremely long?  
  *Hint: Stack overflow could happen; consider iterative approach or storing value references.*

- Can you do this in O(1) extra space?  
  *Hint: Not possible with singly-linked immutable list and only sequential access.*

- If you can call printValue at most K times per second, how would you throttle output?  
  *Hint: Add time.sleep() in loop or recursive call, or use a queue/batch.*

### Summary
This is a classic **reverse traversal** problem for a singly linked list with forward-only access, using either recursion or an explicit stack. The pattern also appears in tree post-order traversal and "print stack backwards" tasks, important for constant-space constraints and cannot-mutate-structure challenges.

### Tags
Linked List(#linked-list), Two Pointers(#two-pointers), Stack(#stack), Recursion(#recursion)

### Similar Problems
