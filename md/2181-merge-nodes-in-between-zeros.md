### Leetcode 2181 (Medium): Merge Nodes in Between Zeros [Practice](https://leetcode.com/problems/merge-nodes-in-between-zeros)

### Description  
We are given a singly linked list where each node contains an integer value. The linked list always starts and ends with 0, and these 0s act as delimiters. Between every two consecutive zeros, there may be one or more positive integers. The task is to create and return a new linked list where each node represents the sum of elements found between two zeros in the original list. The zeros themselves are not present in the result.


### Examples  

**Example 1:**  
Input: `head = [0,3,1,0,4,5,2,0]`  
Output: `[4,11]`  
*Explanation: The first segment between zeros has 3 and 1, summing to 4. The next segment has 4, 5, 2, summing to 11.*

The tree for the input:
```
0
├── 3
│   └── 1
│       └── 0
│           └── 4
│               └── 5
│                   └── 2
│                       └── 0
```

**Example 2:**  
Input: `head = [0,1,0,3,0,2,2,0]`  
Output: `[1,3,4]`  
*Explanation: Segments: 1 (→ 1), 3 (→ 3), 2 and 2 (→ 4).*

**Example 3:**  
Input: `head = [0,0]`  
Output: `[]`  
*Explanation: There are no numbers between zeros, so output is an empty list.*


### Thought Process (as if you’re the interviewee)  
First, notice the important constraint: the list always starts and ends with 0, and sums are between zeros.

Brute-force idea:
- As we traverse the list, whenever we see a 0, we start accumulating values into a running sum until the next 0.
- On reaching the next 0, append the sum to a result list and reset.
- Since zeros are only delimiters and not part of the output, we skip them.

Optimal approach:
- Single pass: as we iterate through the list, for every segment between two zeros, we maintain a current sum.
- When we hit 0 again, and the sum is non-zero, create a new node with the sum and add it to the result.
- Helpful to use a dummy head for the resulting list to simplify linking new nodes.
- This approach is O(n) time and O(1) extra space (apart from result list).

Trade-offs:
- No nested loops are needed, only a single pass.
- Edge cases must be handled (e.g., no numbers between zeros means that sum remains 0 and no node is appended).


### Corner cases to consider  
- Input with only two zeros: `[0,0]` → return `[]`
- Segments where sum is 0 (no numbers between some zeros).
- List with more than one value between zeros (summing all of them correctly).
- Long lists, to check time and space constraints.
- All numbers being positive and between zeros (no negatives or zeros except delimiters).
- If consecutive zeros ever exist between segments — for the guaranteed constraints, that shouldn't happen except at start/end.


### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def mergeNodes(head):
    # We use a dummy head for easier handling of the result list.
    dummy = ListNode(0)
    tail = dummy
    curr = head.next  # Skip the first initial zero.
    curr_sum = 0

    while curr:
        if curr.val == 0:
            if curr_sum > 0:
                # End of a segment: append sum as new node.
                tail.next = ListNode(curr_sum)
                tail = tail.next
                curr_sum = 0
        else:
            curr_sum += curr.val
        curr = curr.next

    return dummy.next
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes in the linked list. Each node is visited exactly once during traversal.
- **Space Complexity:** O(1) (excluding the result list), since a constant amount of extra space is used. The result list uses space proportional to the number of segments, which is at most n, but no extra data structures or recursion are used.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the approach if the list could contain negative values or zeros that are not just delimiters?  
  *Hint: You’d need to clarify how to treat such zeros — as delimiters or not, and possibly use a different strategy.*

- Can this be done in-place, modifying the original list instead of building a new one?  
  *Hint: Try rerouting pointers as you detect segment sums, deleting nodes as you go.*

- What if the list could be extremely large (e.g., streaming input)?  
  *Hint: Since we process sequentially and output is proportional to number of segments, the logic scales, but storing results might require special handling for streaming scenarios.*


### Summary
This problem is a classic example of **Linked List Traversal with Sentinel/Marker values** and constructing a new result list in one pass.
The pattern is: process segments separated by special values (here zeros), summarize data in those segments, and build a new representation.
This is a common approach for delimiter-based partitioning problems and can be applied to arrays, lists, or streams where segment boundaries are marked by specific values.

### Tags
Linked List(#linked-list), Simulation(#simulation)

### Similar Problems
- Linked List Components(linked-list-components) (Medium)