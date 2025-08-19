### Leetcode 457 (Medium): Circular Array Loop [Practice](https://leetcode.com/problems/circular-array-loop)

### Description  
You are playing a game involving a circular array of non-zero integers nums. Each nums[i] denotes the number of indices forward/backward you must move if you are located at index i. If nums[i] is positive, move nums[i] steps forward, and if nums[i] is negative, move nums[i] steps backward. Since the array is circular, moving forward from the last element puts you on the first element, and moving backwards from the first element puts you on the last element. A cycle consists of a sequence of indices where: following the movement rules results in a repeating sequence, every nums[seq[j]] is either all positive or all negative, and the cycle length k > 1. Return true if there is a cycle in nums, or false otherwise.

### Examples  

**Example 1:**  
Input: `nums = [2,-1,1,2,2]`  
Output: `true`  
*Explanation: There is a cycle 0 → 2 → 3 → 0 → ... All moves are in the same direction (forward).*

**Example 2:**  
Input: `nums = [-1,-2,-3,-4,-5,6]`  
Output: `false`  
*Explanation: The only cycle is of size 1 (index 5 points to itself), so we return false.*

**Example 3:**  
Input: `nums = [1,-1,5,1,4]`  
Output: `true`  
*Explanation: There is a cycle 3 → 4 → 3 → ... All moves are in the same direction (forward).*


### Thought Process (as if you're the interviewee)  
This is a cycle detection problem with additional constraints - all elements in the cycle must have the same direction (all positive or all negative) and cycle length > 1.

**Key Observations:**
1. We need to detect cycles in a directed graph where each node has exactly one outgoing edge
2. The cycle must have consistent direction (all positive or all negative values)
3. Self-loops (cycle of length 1) don't count

**Approach using Fast and Slow Pointers (Floyd's Algorithm):**
For each unvisited index, use two pointers:
- Slow pointer: moves one step at a time
- Fast pointer: moves two steps at a time
- If they meet and satisfy all conditions, we found a valid cycle

**Algorithm:**
1. For each starting index, check if we can form a valid cycle
2. Use fast/slow pointers with direction consistency check
3. Mark visited nodes to avoid redundant work
4. Check cycle length > 1


### Corner cases to consider  
- Array with only one element: Cannot form cycle of length > 1  
- All elements pointing to themselves: No valid cycles (length 1)  
- Mixed directions in potential cycle: Invalid cycle  
- Array where no cycles exist: Should return false  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

def circularArrayLoop(nums):
    n = len(nums)
    
    def get_next_index(index):
        # Calculate next index with circular wrapping
        return (index + nums[index]) % n
    
    def has_same_direction(index1, index2):
        # Check if both indices have same direction (both positive or both negative)
        return (nums[index1] > 0) == (nums[index2] > 0)
    
    # Try starting from each index
    for start in range(n):
        # Skip if already marked as invalid
        if nums[start] == 0:
            continue
            
        # Floyd's cycle detection with direction check
        slow = fast = start
        
        # Move pointers while maintaining direction consistency
        while (has_same_direction(slow, get_next_index(slow)) and 
               has_same_direction(fast, get_next_index(fast)) and
               has_same_direction(get_next_index(fast), get_next_index(get_next_index(fast)))):
            
            slow = get_next_index(slow)
            fast = get_next_index(get_next_index(fast))
            
            # Found a cycle
            if slow == fast:
                # Check if cycle length > 1 (not a self-loop)
                if slow == get_next_index(slow):
                    # Self-loop, invalid
                    break
                return True
        
        # Mark all nodes in this path as invalid to avoid revisiting
        slow = start
        direction = nums[start] > 0
        while has_same_direction(slow, get_next_index(slow)) and (nums[slow] > 0) == direction:
            next_index = get_next_index(slow)
            nums[slow] = 0  # Mark as visited/invalid
            slow = next_index
    
    return False

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) - Although we have nested loops, each element is visited at most a constant number of times because we mark invalid paths. The amortized complexity is linear.
- **Space Complexity:** O(1) - We only use a constant amount of extra space (slow, fast pointers and helper variables). We modify the input array to mark visited nodes.


### Potential follow-up questions (as if you're the interviewer)  

- How would you solve this without modifying the input array?  
  *Hint: Use a separate visited array or set to track visited indices, but this increases space complexity to O(n)*

- What if the problem allowed cycles with mixed directions?  
  *Hint: Remove the direction consistency check, but still need to ensure cycle length > 1*

- Can you optimize for the case where we need to find the actual cycle, not just detect its existence?  
  *Hint: Once cycle is detected, trace back to find the actual cycle nodes and return them*

### Summary
This problem combines cycle detection (Floyd's algorithm) with additional constraints about direction consistency and cycle length. The key insight is using fast and slow pointers while carefully checking direction consistency at each step. The optimization of marking invalid paths ensures we don't waste time on previously explored paths. This pattern appears in many graph traversal problems where you need to detect specific types of cycles or paths with constraints.

### Tags
Array(#array), Hash Table(#hash-table), Two Pointers(#two-pointers)

### Similar Problems
