### Leetcode 646 (Medium): Maximum Length of Pair Chain [Practice](https://leetcode.com/problems/maximum-length-of-pair-chain)

### Description  
Given a list of integer pairs where each pair (a, b) consists of two numbers with a < b, find the maximum length of a chain that can be formed with these pairs. A pair (c, d) can follow a pair (a, b) if and only if b < c. The chain should be as long as possible; you don't need to use all pairs, and they can be selected in any order.

### Examples  

**Example 1:**  
Input: `[[1,2], [2,3], [3,4]]`  
Output: `2`  
*Explanation: The longest chain is [1,2] → [3,4]. Since 2 == 3, you cannot include [2,3] directly after [1,2]. So the answer is 2.*

**Example 2:**  
Input: `[[1,2], [7,8], [4,5]]`  
Output: `3`  
*Explanation: All pairs can be chained: [1,2] → [4,5] → [7,8]. The answer is 3.*

**Example 3:**  
Input: `[[5,24], [15,25], [27,40], [50,60]]`  
Output: `3`  
*Explanation: One possible chain: [5,24] → [27,40] → [50,60]. Total length is 3.*

### Thought Process (as if you’re the interviewee)  
To approach this:
- The brute-force way is to attempt all possible orderings and count the maximum valid chain: this is slow (exponential time).
- Notice that we need the next pair’s start to be greater than the previous pair’s end.
- This is similar to interval scheduling — specifically, the "activity selection" problem.
- To optimize, **sort pairs by their end** (second element) in ascending order. This helps always leave the most room for the next selection, maximizing the chain.
- For each pair, greedily pick the next whose start is greater than the end of the last in the chain, and count how many pairs you can include.
- This approach runs in O(n log n) time (for sort), O(1) space if done in-place.

### Corner cases to consider  
- Empty pairs list → output is 0.
- One pair only → output is 1.
- Pairs that overlap so only one can ever be chosen (e.g., [[1,4],[2,5],[3,6]]).
- Pairs where all can be chained, regardless of order.
- Pairs with negative numbers.

### Solution

```python
def findLongestChain(pairs):
    # Sort pairs by their end value (second element)
    pairs.sort(key=lambda x: x[1])
    count = 0
    curr_end = float('-inf')
    
    for pair in pairs:
        # If the current pair starts after the last included pair ends,
        # include it in the chain and update the end marker
        if pair[0] > curr_end:
            count += 1
            curr_end = pair[1]
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of pairs, due to the sort operation. The iteration through the list is O(n).
- **Space Complexity:** O(1) extra (not counting input) as we only use a few variables (count, curr_end), and sorting can be done in-place depending on the language/environment.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted to return the actual longest chain, not just the length?  
  *Hint: Store the selected pairs in a result list while iterating.*

- How would the solution change if the pairs were not guaranteed a < b?  
  *Hint: Filter out invalid pairs or sort each pair before processing.*

- What if the input list was streaming, and you couldn't sort?  
  *Hint: Use a variation of the greedy approach with an interval heap or dynamically update the endpoints.*

### Summary
This problem uses the **greedy algorithm/interval scheduling** pattern, focusing on sorting by end time to optimize selection. The strategy is similar to activity selection and other interval problems, and the same greedy approach often applies in scheduling and selection problems where overlap constraints exist.