### Leetcode 2899 (Easy): Last Visited Integers [Practice](https://leetcode.com/problems/last-visited-integers)

### Description  
Given a list of strings called `words`, where each element is either an integer in string format or the keyword "prev", process the elements in order.  
- Whenever an integer appears, store it in a list of "seen" numbers.  
- When "prev" appears, return the last visited integer: the first "prev" returns the last seen integer, the second consecutive "prev" returns the second-last seen integer, and so on.  
- If there are not enough stored numbers for the k-th "prev", return -1 for that "prev".  
- After seeing a number, the count of consecutive "prev" resets.

### Examples  

**Example 1:**  
Input: `["1","2","prev","prev","prev"]`  
Output: `[2,1,-1]`  
*Explanation:  
- Add 1, add 2  
- "prev": 1ˢᵗ previous is 2 → output 2  
- "prev": 2ⁿᵈ previous is 1 → output 1  
- "prev": 3ʳᵈ previous, nothing left → output -1*

**Example 2:**  
Input: `["5","prev","10","prev","prev"]`  
Output: `[5,10,-1]`  
*Explanation:  
- Add 5  
- "prev": 1ˢᵗ previous is 5 → output 5  
- Add 10 (resets count)  
- "prev": 1ˢᵗ previous after last integer is 10 → output 10  
- "prev": 2ⁿᵈ previous is 5 → output -1 (not enough numbers, since count resets after 10)*

**Example 3:**  
Input: `["3","prev","prev","2","prev","prev"]`  
Output: `[3,-1,2,3]`  
*Explanation:  
- Add 3  
- "prev": 1ˢᵗ previous is 3 → output 3  
- "prev": 2ⁿᵈ previous is -1 (nothing before 3)  
- Add 2 (resets count)  
- "prev": 1ˢᵗ previous is 2 → output 2  
- "prev": 2ⁿᵈ previous is 3 → output 3*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each "prev", scan back to find the required previous integer. This is inefficient because it repeatedly traverses the "seen" numbers.
- **Optimized:**  
  - Maintain a list (stack) of all seen integers.
  - For each "prev", track the count of consecutive "prev" calls (k).
  - For k consecutive "prev", fetch the (length-k)-th element from the list (using negative indexing in Python).
  - If there aren't enough seen numbers, return -1.
  - Reset k to 0 every time you see a number.
- **Trade-offs:**  
  - List access by index is O(1).
  - Only need to keep a running count, so no extra space for windowing.
  - This is optimal in both time and space.

### Corner cases to consider  
- No integers before first "prev" (must return -1).
- Consecutive "prev" commands exceeding stored numbers.
- Input starts or ends with "prev".
- Only one integer in input.
- Mix of numbers and "prev" with resets.
- Very large input arrays (should remain efficient).

### Solution

```python
def lastVisitedIntegers(words):
    # Store all seen integers
    nums = []
    # Store output for each "prev"
    ans = []
    # Counter for consecutive "prev" commands
    k = 0

    for word in words:
        if word == "prev":
            k += 1
            # The -k-th element from the right; if not enough, output -1
            if k > len(nums):
                ans.append(-1)
            else:
                ans.append(nums[-k])
        else:
            k = 0  # Reset on seeing a number
            nums.append(int(word))
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of words. Each word is processed once, and list indexing is O(1).
- **Space Complexity:** O(n), for storing all seen integers. Output size is ≤ n (one per "prev").

### Potential follow-up questions (as if you’re the interviewer)  

- What if, instead of integers as input, you had generic objects?  
  *Hint: Can you generalize your solution to work with any type supporting storage and indexing?*

- Can you handle queries like "prev_3" to get the 3ʳᵈ last visited integer in one shot?  
  *Hint: Parse the command for an index, and fetch directly from the stored values.*

- If the input size is massive and we only care about a fixed window of the last k numbers, how could you optimize space?  
  *Hint: Use a fixed-size queue or deque to limit memory usage to k elements.*

### Summary
This problem uses the pattern of a **stack/history with indexed lookback**, a classic variant of backtracking or undo functionality.  
It's commonly seen in browser history stacks, undo-redo implementations, or IRL UI navigation.  
With only two stateful variables—the list of seen elements and count of consecutive lookbacks—it’s both space and time efficient.  
This indexed history lookup pattern also applies to command history, call logs, and any context where recent actions need to be revisited or recalled in order.