### Leetcode 1836 (Medium): Remove Duplicates From an Unsorted Linked List [Practice](https://leetcode.com/problems/remove-duplicates-from-an-unsorted-linked-list)

### Description  
Given the head of a singly-linked list, remove all nodes whose values occur more than once in the list. Only keep nodes whose values are unique (appear exactly once). Return the head of the modified list.  
- *Order must be preserved based on the first occurrence.*
- *Linked list is unsorted and could be large (up to 10⁵ nodes).*

### Examples  

**Example 1:**  
Input: `[1,2,3,2]`  
Output: `[1,3]`  
*Explanation: 2 appears twice, so all nodes with value 2 are removed. Remaining nodes are 1 and 3, in order.*

**Example 2:**  
Input: `[2,1,1,2]`  
Output: `[]`  
*Explanation: Both 2 and 1 are duplicated, so all nodes are removed. Result is an empty list.*

**Example 3:**  
Input: `[3,2,2,1,3,2,4]`  
Output: `[1,4]`  
*Explanation: 3 appears twice and 2 appears three times. Only unique-valued nodes (1 and 4) are kept.*

### Thought Process (as if you’re the interviewee)  
First idea is to scan each node and check if its value exists elsewhere.  
- A brute-force way would be to use two nested loops and for each node, check all other nodes for duplicates (O(n²) time).  
- That doesn’t scale for large lists (n up to 10⁵).  

Optimized approach:  
- Use a hash map to count occurrences of each value in the list (single pass).
- In a second pass, construct the new list by skipping any node whose value count > 1.  

Why choose this method:  
- Hash maps provide O(1) average time for get/set.
- Two passes, but both O(n).  
- Simple logic, easy to code and read.
- Trade-off is using extra O(n) space for frequency counting, but otherwise removing duplicates in O(n) from an unsorted list is not possible.

### Corner cases to consider  
- Empty list (`head == None`)
- List with one node
- All nodes have same value (output is [])
- All nodes are unique (output is original list)
- Head node is a duplicate
- Duplicates are at the end or beginning
- Large lists

### Solution

```python
# Definition for singly-linked list node
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def deleteDuplicatesUnsorted(head):
    # Step 1: Count frequencies of all values
    freq = {}
    curr = head
    while curr:
        freq[curr.val] = freq.get(curr.val, 0) + 1
        curr = curr.next

    # Step 2: Build the result list, skipping duplicates
    dummy = ListNode(0)
    prev = dummy
    curr = head

    while curr:
        if freq[curr.val] == 1:
            prev.next = curr
            prev = prev.next
        curr = curr.next

    # The last node's next should be None to avoid cycle
    prev.next = None

    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - First pass: count frequencies (O(n)).  
  - Second pass: build new list (O(n)).  
  - Total: O(n), where n is the number of nodes.

- **Space Complexity:** O(n)  
  - Hash map for counts can use up to n keys (if all unique).  
  - Input and output lists use no new nodes.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you're not allowed O(n) extra space?  
  *Hint: Consider in-place algorithms with more than O(n) time; maybe O(n²) using nested loops.*

- Can you preserve random pointers if the node is a custom structure?  
  *Hint: Copy over all non-duplicate nodes and update pointers as you build the result.*

- How would this change if only the *first* occurrence of each value is kept?  
  *Hint: Use a set to track seen values, remove only subsequent duplicates.*

### Summary
This problem is a classic application of the “hash map for frequency counting” pattern, which appears in duplicate removal and unique-element problems.  
The two-pass approach (frequency count, then filter for unique nodes) is simple and efficient for detecting all duplicates in one go.  
It’s a useful techique for unsorted data, and variations of this strategy work well in arrays and other structures where “all occurrences” need to be identified and handled efficiently.

### Tags
Hash Table(#hash-table), Linked List(#linked-list)

### Similar Problems
- Remove Duplicates from Sorted List II(remove-duplicates-from-sorted-list-ii) (Medium)
- Remove Duplicates from Sorted List(remove-duplicates-from-sorted-list) (Easy)