### Leetcode 287 (Medium): Find the Duplicate Number [Practice](https://leetcode.com/problems/find-the-duplicate-number)

### Description  
Given an array of n+1 integers where each integer is in the range 1 to n (inclusive), and there is only one repeated number in the array (though it could be repeated more than once), find that duplicate number.  
You must solve the problem **without modifying the array** and using only constant extra space.

### Examples  

**Example 1:**  
Input: `[1,3,4,2,2]`  
Output: `2`  
*Explanation: The number 2 appears twice. All other numbers are unique.*

**Example 2:**  
Input: `[3,1,3,4,2]`  
Output: `3`  
*Explanation: The number 3 is the only duplicate. Every other number is unique.*

**Example 3:**  
Input: `[1,1]`  
Output: `1`  
*Explanation: 1 is repeated. Only two elements in the input, both are the same.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each element, check whether it appears again in the rest of the array (O(n²)). Not efficient for large input.
- **Sorting:** Sort the array and scan for consecutive duplicate elements. Modifies the input, which is not allowed here.
- **Hashing:** Use a set to store seen elements. On seeing the number again, return it. This is O(n) time but uses O(n) extra space.
- **Cycle detection (Floyd's Tortoise and Hare):**  
  Consider array values as pointers to indices, forming a "cycle". Use Floyd's two-pointer approach to find the entrance to the cycle, which is the duplicate.  
  This approach runs in O(n) time, uses only O(1) extra space, and does not need to modify the array. It is optimal for the problem given the constraints.

### Corner cases to consider  
- Input of minimal length (two elements, both the same): `[1,1]`
- The duplicate appears at the start or end.
- The duplicate occurs multiple times, not just twice.
- Non-consecutive duplicates (e.g., `[2,4,6,2,3,1]`)
- All numbers present, but only one is duplicated.

### Solution

```python
def findDuplicate(nums):
    # Use Floyd's Tortoise and Hare (Cycle Detection)
    # Phase 1: Find intersection point of two runners
    slow = nums[0]
    fast = nums[0]
    while True:
        slow = nums[slow]         # move slow by 1 step
        fast = nums[nums[fast]]   # move fast by 2 steps
        if slow == fast:
            break
    
    # Phase 2: Find entrance to the cycle (duplicate number)
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Both phases of Floyd's algorithm traverse at most n steps each, as every value is within the range 1..n.
- **Space Complexity:** O(1) — Only uses a fixed number of pointers; no extra space proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What can you do if you are allowed to modify the input array?  
  *Hint: Try marking visited indices or use sorting.*

- Can you find the duplicate if the array contains multiple duplicates?  
  *Hint: What changes if you need to return all duplicates and not just one?*

- Can you solve the problem if the numbers are not guaranteed to be in the 1..n range?  
  *Hint: Does the cycle detection logic still hold?*

### Summary
This solution uses the **Floyd's Tortoise and Hare algorithm**, a classic cycle detection technique, treating array indices and values like a linked list structure to find the duplicate. This is a powerful, space-efficient pattern also applicable to linked list cycle problems, especially **finding the cycle entrance** (cycle start), not just its existence. This approach is optimal when mutation isn’t allowed and extra space is restricted.


### Flashcard
Floyd's cycle detection treating array values as pointers; find cycle entry point which reveals the duplicate in O(n) time, O(1) space.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Bit Manipulation(#bit-manipulation)

### Similar Problems
- First Missing Positive(first-missing-positive) (Hard)
- Single Number(single-number) (Easy)
- Linked List Cycle II(linked-list-cycle-ii) (Medium)
- Missing Number(missing-number) (Easy)
- Set Mismatch(set-mismatch) (Easy)