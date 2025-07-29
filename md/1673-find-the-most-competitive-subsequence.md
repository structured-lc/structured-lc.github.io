### Leetcode 1673 (Medium): Find the Most Competitive Subsequence [Practice](https://leetcode.com/problems/find-the-most-competitive-subsequence)

### Description  
Given an integer array and an integer k, return the most **competitive** subsequence of size k.  
A subsequence is formed by deleting any number of elements (without changing the order).  
A subsequence a is more competitive than subsequence b (same length) if at the first position where they differ, a's element is smaller. Effectively, find the lexicographically smallest subsequence of length k from the array.

### Examples  

**Example 1:**  
Input: `nums = [3,5,2,6]`, `k = 2`  
Output: `[2,6]`  
*Explanation: Consider all subsequences of size 2: [3,5], [3,2], [3,6], [5,2], [5,6], [2,6]. [2,6] is lexicographically the smallest.*

**Example 2:**  
Input: `nums = [2,4,3,3,5,4,9,6]`, `k = 4`  
Output: `[2,3,3,4]`  
*Explanation: By carefully picking elements while keeping future choices open, [2,3,3,4] is achievable and is the smallest.*

**Example 3:**  
Input: `nums = [9,8,7,6,5,4,3,2,1]`, `k = 3`  
Output: `[3,2,1]`  
*Explanation: Strip away everything until last 3, but at each step, remove larger numbers from before if possible. End with the smallest triple.*

### Thought Process (as if you’re the interviewee)  
- The brute-force approach generates all subsequences of length k, then picks the smallest — but that's exponential (very slow).
- Notice that to keep the sequence most competitive (lexicographically smallest), whenever we see a smaller element and have enough future elements to fill k, we can replace previous larger elements.
- A **monotonic stack** pattern works:  
    - Traverse from left to right. Maintain a stack of up to k elements.
    - For each element, while:
        - The top of the stack is larger than the current element, **and**
        - We have enough elements left (total elements left + stack length > k),  
        - Pop the stack (remove larger, earlier entry).
    - Then push the current element if stack has < k elements.
- Greedily ensure each position picks the smallest valid number possible.

Why this works:
- At any position, if you can make the start of your subsequence smaller, do it as long as you’ll still be able to form a result of size k (i.e., check remaining capacity).

**Tradeoffs:**  
- Brute-force is unacceptably slow (combinatorial explosion).
- This greedy, stack-based approach runs in linear time and space.

### Corner cases to consider  
- k is 1 or k == len(nums): Only min element or original list.
- nums contains duplicate values.
- Input array strictly increasing or decreasing.
- Array with all elements equal.
- nums has large values at the start: should be popped for smaller ones appearing later.
- nums contains very large/small numbers.
- nums with multiple places where popping is possible to create more competitive output.

### Solution

```python
def mostCompetitive(nums, k):
    stack = []
    n = len(nums)
    for i, num in enumerate(nums):
        # While stack not empty, last element is bigger, and we have enough left to fill k
        while stack and num < stack[-1] and len(stack) + (n - i) > k:
            stack.pop()
        if len(stack) < k:
            stack.append(num)
    return stack
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(nums).  
  Each item is pushed to and popped from the stack at most once.
- **Space Complexity:** O(k) for the output stack, plus negligible auxiliary variables.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the array were mutable and you could remove elements in place?  
  *Hint: Consider modifying the input array directly and managing the positions for potential pops and pushes.*

- What if "competitive" was defined differently, such as maximizing instead of minimizing?  
  *Hint: Try reversing the comparison from min to max everywhere in your algorithm.*

- How to handle very large inputs when k is very small or very large?  
  *Hint: Analyze how early you can prune and when you can stop iterating early.*

### Summary
This problem uses a classic **monotonic stack** / **greedy** pattern to compute an optimal lexicographically small subsequence in O(n) time.  
Similar patterns are used in problems like “Remove k Digits” or “Next Greater Element.”  
Understanding when and how to use monotonic stacks for greedy deletion—while keeping the constraint of future availability in mind—is key for mastering a variety of sequence selection problems.