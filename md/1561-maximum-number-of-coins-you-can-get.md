### Leetcode 1561 (Medium): Maximum Number of Coins You Can Get [Practice](https://leetcode.com/problems/maximum-number-of-coins-you-can-get)

### Description  
You are given `3n` piles of coins, each with a certain number of coins. You play a game with Alice and Bob: during each turn, you, Alice, and Bob each take turns picking a pile from *any* of the remaining piles. Alice always takes the pile with the most coins, you take the next largest pile, and Bob takes the smallest among the three piles picked that round. The process repeats until no piles are left. Your task is to maximize the total number of coins you collect.

### Examples  

**Example 1:**  
Input: `piles = [2,4,1,2,7,8]`  
Output: `9`  
*Explanation: The optimal way is to choose (2,7,8), you pick 7. Choose (1,2,4), you pick 2. Total = 7+2 = 9.*

**Example 2:**  
Input: `piles = [2,4,5]`  
Output: `4`  
*Explanation: One group only; sorted: [2,4,5]. Alice: 5, You: 4, Bob: 2.*

**Example 3:**  
Input: `piles = [9,8,7,6,5,1,2,3,4]`  
Output: `18`  
*Explanation: After sorting: [1,2,3,4,5,6,7,8,9]. Pick in groups of 3; you will pick 6, 7, and 5. So total = 6+7+5 = 18.*


### Thought Process (as if you’re the interviewee)  
First, sort the piles in ascending order. In each group of 3 (after sorting), the largest goes to Alice, the smallest to Bob, and you always get the middle pile. By always taking the second-largest coin (the 'middle' one from largest-to-smallest among three choices), you can maximize your gain. We repeatedly pick groups of three from the end (largest values), each time skipping the largest (for Alice) and the smallest (for Bob).

Optimal approach: After sorting, starting from the largest end, always pick the pile at positions just after Alice's pick and one before Bob's (i.e., the middle one in every trio from the right). You can do this by summing the appropriate indices while moving inward two-by-two from the sorted list (starting from ⌊n/3⌋ index up to end-1, step by 2).


### Corner cases to consider  
- All piles are of equal size
- Only one group of 3 remains (minimum case)
- Coins in strictly increasing or decreasing order
- Large input size, to test efficiency


### Solution

```python
def maxCoins(piles):
    # Sort to get control of smallest/largest
    piles.sort()
    n = len(piles)//3
    res = 0
    # Start from n, pick every second until the end
    for i in range(n, len(piles), 2):
        res += piles[i]
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sorting the piles; picking the coins is O(n).
- **Space Complexity:** O(1) extra space, as we sort in-place (ignoring input size).


### Potential follow-up questions (as if you’re the interviewer)  

- What if Alice does not always pick the maximum pile?
  *Hint: How does the selection bias affect greedy choice?*

- What if there are more than three players?
  *Hint: How could you generalize the picking order and indices?*

- If you had to return which piles to pick, not just the sum, how would you modify your strategy?
  *Hint: Keep track of indices as you go along; consider state at each pick.*

### Summary
This is a classic greedy and sorting problem. By sorting and taking every second pile from ⌊n/3⌋ onward, you maximize your coins under the game's rules. The pattern here (greedily picking based on sorted order) is common in coin games, selecting intervals, or maximizing minimum/median elements under constraints.

### Tags
Array(#array), Math(#math), Greedy(#greedy), Sorting(#sorting), Game Theory(#game-theory)

### Similar Problems
