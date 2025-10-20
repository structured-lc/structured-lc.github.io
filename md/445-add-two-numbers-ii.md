### Leetcode 445 (Medium): Add Two Numbers II [Practice](https://leetcode.com/problems/add-two-numbers-ii)

### Description  
You are given two non-empty linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

### Examples  

**Example 1:**  
Input: `l1 = [7,2,4,3], l2 = [5,6,4]`  
Output: `[7,8,0,7]`  
*Explanation: 7243 + 564 = 7807.*

**Example 2:**  
Input: `l1 = [2,4,3], l2 = [5,6,4]`  
Output: `[8,0,7]`  
*Explanation: 243 + 564 = 807.*

**Example 3:**  
Input: `l1 = [0], l2 = [0]`  
Output: `[0]`  

### Thought Process (as if you're the interviewee)  
This problem is similar to "Add Two Numbers I" but with a key difference: digits are stored in normal order (most significant first) instead of reverse order. This means we need to process digits from right to left (least significant first) for addition.

Approaches:
1. **Reverse both lists**: Reverse input lists, use standard addition, reverse result
2. **Use stacks**: Push all digits to stacks, then pop and add from right to left
3. **Recursive approach**: Handle carry propagation through recursion
4. **Length-based alignment**: Align shorter list with longer list and process

The stack approach is most intuitive as it naturally handles the right-to-left processing needed for addition.

### Corner cases to consider  
- Different length lists
- Carry propagation to create new most significant digit
- Lists with single zero
- One list much longer than the other
- Maximum carry scenarios
- Empty lists (though problem states non-empty)

### Solution

```python
# Definition for singly-linked list
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1, l2):
    # Use stacks to reverse the order for addition
    stack1, stack2 = [], []
    
    # Push all digits to stacks
    while l1:
        stack1.append(l1.val)
        l1 = l1.next
    
    while l2:
        stack2.append(l2.val)
        l2 = l2.next
    
    carry = 0
    result = None
    
    # Process digits from right to left
    while stack1 or stack2 or carry:
        # Get digits (0 if stack is empty)
        digit1 = stack1.pop() if stack1 else 0
        digit2 = stack2.pop() if stack2 else 0
        
        # Calculate sum and carry
        total = digit1 + digit2 + carry
        carry = total // 10
        digit = total % 10
        
        # Create new node and prepend to result
        new_node = ListNode(digit)
        new_node.next = result
        result = new_node
    
    return result

# Alternative approach: Reverse lists
def addTwoNumbersReverse(l1, l2):
    def reverse_list(head):
        prev = None
        current = head
        
        while current:
            next_temp = current.next
            current.next = prev
            prev = current
            current = next_temp
        
        return prev
    
    def add_normal_order(l1, l2):
        dummy = ListNode(0)
        current = dummy
        carry = 0
        
        while l1 or l2 or carry:
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0
            
            total = val1 + val2 + carry
            carry = total // 10
            digit = total % 10
            
            current.next = ListNode(digit)
            current = current.next
            
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None
        
        return dummy.next
    
    # Reverse input lists
    rev_l1 = reverse_list(l1)
    rev_l2 = reverse_list(l2)
    
    # Add in reverse order
    rev_result = add_normal_order(rev_l1, rev_l2)
    
    # Reverse result back
    return reverse_list(rev_result)

# Recursive approach
def addTwoNumbersRecursive(l1, l2):
    def get_length(head):
        length = 0
        while head:
            length += 1
            head = head.next
        return length
    
    def add_helper(l1, l2, len1, len2):
        # Base case
        if len1 == 0 and len2 == 0:
            return None, 0
        
        # Recursive case
        if len1 > len2:
            next_node, carry = add_helper(l1.next, l2, len1 - 1, len2)
            total = l1.val + carry
        elif len2 > len1:
            next_node, carry = add_helper(l1, l2.next, len1, len2 - 1)
            total = l2.val + carry
        else:
            next_node, carry = add_helper(l1.next, l2.next, len1 - 1, len2 - 1)
            total = l1.val + l2.val + carry
        
        # Create current node
        current = ListNode(total % 10)
        current.next = next_node
        
        return current, total // 10
    
    len1 = get_length(l1)
    len2 = get_length(l2)
    
    result, carry = add_helper(l1, l2, len1, len2)
    
    # Handle final carry
    if carry:
        new_head = ListNode(carry)
        new_head.next = result
        return new_head
    
    return result

# Clean stack-based solution
def addTwoNumbersStack(l1, l2):
    def list_to_stack(head):
        stack = []
        while head:
            stack.append(head.val)
            head = head.next
        return stack
    
    stack1 = list_to_stack(l1)
    stack2 = list_to_stack(l2)
    
    carry = 0
    head = None
    
    while stack1 or stack2 or carry:
        digit1 = stack1.pop() if stack1 else 0
        digit2 = stack2.pop() if stack2 else 0
        
        sum_val = digit1 + digit2 + carry
        carry = sum_val // 10
        
        # Insert at beginning
        node = ListNode(sum_val % 10)
        node.next = head
        head = node
    
    return head

# Iterative approach with length calculation
def addTwoNumbersIterative(l1, l2):
    def get_length(head):
        count = 0
        while head:
            count += 1
            head = head.next
        return count
    
    len1, len2 = get_length(l1), get_length(l2)
    
    # Make sure l1 is the longer list
    if len1 < len2:
        l1, l2 = l2, l1
        len1, len2 = len2, len1
    
    result = None
    carry = 0
    
    # Process the longer part first
    for _ in range(len1 - len2):
        new_node = ListNode(l1.val)
        new_node.next = result
        result = new_node
        l1 = l1.next
    
    # Process remaining parts together
    while l1 and l2:
        total = l1.val + l2.val + carry
        carry = total // 10
        
        new_node = ListNode(total % 10)
        new_node.next = result
        result = new_node
        
        l1 = l1.next
        l2 = l2.next
    
    # Handle final carry
    if carry:
        # Propagate carry through result
        current = result
        while current and carry:
            total = current.val + carry
            current.val = total % 10
            carry = total // 10
            if carry and not current.next:
                current.next = ListNode(carry)
                carry = 0
            current = current.next
    
    return result

# Convert to integers approach (for understanding, but may overflow)
def addTwoNumbersInteger(l1, l2):
    def list_to_int(head):
        num = 0
        while head:
            num = num * 10 + head.val
            head = head.next
        return num
    
    def int_to_list(num):
        if num == 0:
            return ListNode(0)
        
        result = None
        while num > 0:
            node = ListNode(num % 10)
            node.next = result
            result = node
            num //= 10
        
        return result
    
    num1 = list_to_int(l1)
    num2 = list_to_int(l2)
    sum_num = num1 + num2
    
    return int_to_list(sum_num)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(max(m, n)) where m and n are the lengths of the two linked lists. We need to traverse both lists once.
- **Space Complexity:** O(max(m, n)) for the stacks in the stack approach, or O(max(m, n)) for the recursion stack in the recursive approach.

### Potential follow-up questions (as if you're the interviewer)  

- How would you solve this without using extra space for stacks?  
  *Hint: Reverse the input lists, perform addition, then reverse the result back.*

- What if the numbers could be negative?  
  *Hint: Handle sign separately and perform subtraction when signs differ.*

- How would you modify this for base-k number system instead of base-10?  
  *Hint: Replace 10 with k in carry calculations and digit extraction.*

- Can you solve this if you're not allowed to modify the input lists?  
  *Hint: The stack approach naturally preserves input lists, or create copies before reversing.*

### Summary
This problem extends the classic "Add Two Numbers" problem by reversing the digit order, requiring us to process from least significant to most significant digit. The stack-based approach elegantly handles this by naturally reversing the processing order. This pattern is useful in problems involving digit manipulation, arithmetic operations on large numbers, and scenarios where processing order matters. Understanding multiple approaches (stacks, recursion, list reversal) provides flexibility for different constraints and follow-up questions.


### Flashcard
Add two numbers stored in forward order by reversing lists, adding, then reversing result—or use stacks.

### Tags
Linked List(#linked-list), Math(#math), Stack(#stack)

### Similar Problems
- Add Two Numbers(add-two-numbers) (Medium)
- Add Two Polynomials Represented as Linked Lists(add-two-polynomials-represented-as-linked-lists) (Medium)