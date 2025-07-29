### Leetcode 2130 (Medium): Maximum Twin Sum of a Linked List [Practice](https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list)

### Description  
Given a singly linked list of even length *n*, where each node at index \( i \) has a **twin** node at index \( n-1-i \), compute the **maximum twin sum**. A twin sum is defined as the sum of the values of a node and its twin. You are to determine the largest such sum for the entire list.

For example, for the list:  
`1 → 2 → 3 → 4`  
Twins are (1,4) and (2,3). The twin sums are 1+4=5 and 2+3=5, so the maximum twin sum is 5[1][2].

### Examples  

**Example 1:**  
Input: `head = [5, 4, 2, 1]`  
Output: `6`  
*Explanation: Twins are (5,1) and (4,2). Sums are 6 and 6. Answer is 6[4].*

**Example 2:**  
Input: `head = [4, 2, 2, 3]`  
Output: `7`  
*Explanation: Twins are (4,3) and (2,2). Sums are 7 and 4. Maximum is 7[4].*

**Example 3:**  
Input: `head = [1, 100000]`  
Output: `100001`  
*Explanation: Only one pair (1,100000). Sum is 100001[4].*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:**  
  Walk the list, store all values in an array. For each index \( i \), compute value at \( i \) + value at \( n-1-i \) for \( i \) in range up to ⌊n/2⌋. Track the maximum sum found.
  - *Time*: O(n) for collection, O(n/2) for computation ⇒ O(n).
  - *Space*: O(n) extra for array storage.

- **Optimized approach:**  
  We want to reduce extra space. Instead of an array:
    1. Use two pointers to find the middle of the list (slow/fast pointer technique).
    2. Reverse the second half of the list in-place.
    3. Walk one pointer from the start and one from the reversed-half, summing values pairwise.
    4. Restore the list (optional, for real usage).
  - *Time*: O(n) (pass to find mid, reverse, and compute)
  - *Space*: O(1) extra, since work is done in-place[2].

I choose the **in-place reversal** approach because it's space optimized, shows linked list mastery, and is commonly used in interview setting.

### Corner cases to consider  
- List of length 2 (minimum valid even length)
- All nodes have equal values
- Large value differences between pairs
- Input with negative values (if constraint allows)
- Very large n (check for efficiency)

### Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def pairSum(head):
    # Step 1: Find the middle of the list.
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    # Step 2: Reverse the second half.
    prev = None
    curr = slow
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt

    # Step 3: Pairwise sum and find max.
    max_sum = 0
    first = head
    second = prev  # head of reversed second half

    while second:
        twin_sum = first.val + second.val
        max_sum = max(max_sum, twin_sum)
        first = first.next
        second = second.next

    return max_sum
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - O(n) to find the middle, reverse the second half, and O(n/2) to compute pairwise sums.
- **Space Complexity:** O(1)  
  - Uses only a constant amount of extra pointers; no additional storage proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the list length is odd?  
  *Hint: Define what "twin" means for the middle node, or adjust logic accordingly.*

- Can you restore the linked list to its original structure after finding the answer?  
  *Hint: Repeat the reversal on the second half again.*

- Can you generalize this to k-way sum from both ends?  
  *Hint: Think about splitting the list in k portions and synchronizing multiple pointers.*

### Summary
This approach leverages the **slow/fast pointer** pattern for finding the middle, **in-place reversal** for paired access, and a single forward pass for summation. These are *classic* linked list techniques, commonly useful for palindrome checking, twin-value pairing, and other symmetry-based linked list problems.
