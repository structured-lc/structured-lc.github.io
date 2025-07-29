### Leetcode 1944 (Hard): Number of Visible People in a Queue [Practice](https://leetcode.com/problems/number-of-visible-people-in-a-queue)

### Description  
Given a queue of people standing left to right, each with a unique height (given in an array `heights`), calculate for each person how many people they can see to their right.  
A person at index `i` can see another person at index `j > i` if every person between `i` and `j` is shorter than both persons `i` and `j`. Visibility stops at the first person as tall or taller than `i` beyond `i`.  
Return an array `answer` where `answer[i]` is the number of people the iᵗʰ person can see to their right.

### Examples  

**Example 1:**  
Input: `heights = [10,6,8,5,11,9]`  
Output: `[3,1,2,1,1,0]`  
*Explanation:*
- Person 0 (10): can see 6, 8, 11. Blocked by 11. Total: 3  
- Person 1 (6): can see 8. Blocked by 8. Total: 1  
- Person 2 (8): can see 5, 11. Blocked by 11. Total: 2  
- Person 3 (5): can see 11. Blocked by 11. Total: 1  
- Person 4 (11): can see 9. No one taller after. Total: 1  
- Person 5 (9): no one to the right. Total: 0  

**Example 2:**  
Input: `heights = [5,1,2,3,10]`  
Output: `[4,1,1,1,0]`  
*Explanation:*
- Person 0 (5): can see 1, 2, 3, 10. All are shorter except 10, but 10 is visible because the chain is unbroken until 10, who then blocks visibility further.  
- Person 1 (1): can see 2. Blocked by 2.  
- Person 2 (2): can see 3. Blocked by 3.  
- Person 3 (3): can see 10.  
- Person 4 (10): no one to the right.

**Example 3:**  
Input: `heights = [10,9,8,7,6,5]`  
Output: `[1,1,1,1,1,0]`  
*Explanation:*
- For each person, the next person is always shorter, but since heights strictly decrease, only the immediate next is visible for each.

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  For each person, iterate from their position to the end. For each, count how many people they can see based on the problem’s conditions (i.e., if they are taller than all between). This takes O(n²) time.

- **Optimization (Monotonic Stack):**  
  Since each person can only see until a person blocking their view (equal or taller), process from right to left with a stack:
  - Keep a stack of people (indices) in decreasing order by height.
  - For each person, count how many in the stack are strictly shorter (pop and count), and add one more if the next in stack (if any) is taller or equal — that person is also visible but blocks further.
  - This ensures each person and index is handled at most twice (push & pop), making the process O(n).

- **Why stack?**  
  Stack lets you efficiently find and count visible people to the person’s right, discarding those ‘in between’ that get blocked.

### Corner cases to consider  
- Empty array (`[]`) — should return `[]`.
- All elements equal (not possible per problem, but if allowed).
- Strictly increasing heights.
- Strictly decreasing heights.
- Single element.
- Two elements.
- Large input size.

### Solution

```python
def canSeePersonsCount(heights):
    n = len(heights)
    answer = [0] * n
    stack = []

    # Process from right to left
    for i in range(n - 1, -1, -1):
        count = 0
        # Pop all people shorter than current (visible)
        while stack and heights[i] > stack[-1]:
            stack.pop()
            count += 1
        # If stack not empty, current can see one more (the blocker)
        if stack:
            count += 1
        answer[i] = count
        # Push current person's height onto stack
        stack.append(heights[i])
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each person’s height enters and leaves the stack exactly once. All operations inside the loop are amortized O(1).

- **Space Complexity:** O(n)  
  The stack can hold up to O(n) heights in the worst case (e.g., strictly increasing).

### Potential follow-up questions (as if you’re the interviewer)  

- What if heights are not unique or can be repeated?  
  *Hint: How would you handle equality in the comparison and stack logic?*

- Can this problem be solved in O(1) extra space (in place)?  
  *Hint: Could you use the answer array itself as a stack?*

- How would you modify to return visible **indices** instead of counts?  
  *Hint: Track index instead of just counting, maybe use tuples in the stack.*

### Summary
This is a classic **monotonic stack** pattern, used to process "next greater (or equal)" or "who is visible/blocks view" type problems efficiently. The O(n) approach makes it ideal for large data and is common in stock span, histogram, and similar visibility scenarios.