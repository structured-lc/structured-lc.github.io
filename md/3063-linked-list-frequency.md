### Leetcode 3063 (Easy): Linked List Frequency [Practice](https://leetcode.com/problems/linked-list-frequency)

### Description  
Given the head of a singly linked list containing integer values (not necessarily in order, and there can be duplicates), compute how many times each *distinct* value appears in the list. Return the head of a new linked list where each node's value is the frequency count of some distinct value from the original list. The output list should have as many nodes as there are distinct values, and the order of frequency values does *not* matter.

### Examples  

**Example 1:**  
Input: `head = [1,1,2,1,2,3]`  
Output: `[3,2,1]`  
*Explanation: The frequency of 1 is 3, 2 is 2, and 3 is 1. The output can be any permutation of [3,2,1].*

**Example 2:**  
Input: `head = [5,5,5,5]`  
Output: `[4]`  
*Explanation: Only one element (5), which appears 4 times. Output: [4].*

**Example 3:**  
Input: `head = [4,6,4,7,6,4]`  
Output: `[3,2,1]`  
*Explanation: 4 appears 3 times, 6 appears 2 times, and 7 appears once.*

### Thought Process (as if you’re the interviewee)  
- The goal is to determine the frequency of each *unique* value in a singly linked list, and output a new linked list of those counts.
- **Brute-force** would involve, for each unique value, traversing the entire list and counting occurrences. This is O(nk), where n = number of nodes, k = number of distinct elements. Very inefficient.
- **Optimized**: Traverse the linked list once, storing the occurrence count of each value in a hash map (dictionary). After this traversal, use the dictionary values to construct a new linked list. This reduces time and space to O(n), with a clear tradeoff of additional memory (for the frequency map), but it is optimal for this type of counting & output.

### Corner cases to consider  
- Empty input list (`head = None`): output should also be `None`.
- All values the same: output should be a list with one value, equal to the list’s length.
- All values distinct: output should have each count as 1.
- Only one node: output should be [1].
- Non-sorted input.

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def frequenciesOfElements(head):
    # Edge case: empty list
    if not head:
        return None

    # First pass: Count frequencies of each unique value
    freq = {}
    current = head
    while current:
        if current.val in freq:
            freq[current.val] += 1
        else:
            freq[current.val] = 1
        current = current.next

    # Second pass: Create new linked list from frequencies
    dummy = ListNode(-1)
    tail = dummy
    for count in freq.values():
        tail.next = ListNode(count)
        tail = tail.next

    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — where n is the number of nodes. Each node is visited exactly once for counting, and we iterate through the frequency map (at most n keys if all distinct) to build the output.
- **Space Complexity:** O(k) — where k is the number of distinct elements, due to the extra hash map and output list (could be up to O(n) in worst case if all elements are unique).

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose you need the output list in the order the *first occurrence* of each value appeared in the input.  
  *Hint: Track the insertion order using a `collections.OrderedDict` or a second pointer.*

- Can you do this *in place*, modifying the input list, if you're allowed to discard values?
  *Hint: You'd still need to count first, then overwrite node values.*

- What if you needed both the *distinct values* and their *frequencies* in the new list?
  *Hint: Change node structure to use tuples, or output a paired linked list.*

### Summary
This approach adopts a two-pass technique and the widely-used *hash map counting* pattern. First, frequency counting maps the input efficiently. Second, the output is built as a (possibly unordered) linked list of these counts. This is a common pattern seen in interview problems requiring frequency tally and translation into another form, such as arrays, trees, or lists.