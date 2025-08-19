### Leetcode 3227 (Medium): Vowels Game in a String [Practice](https://leetcode.com/problems/vowels-game-in-a-string)

### Description  
Given a string s, two players (Alice and Bob) play a game where they take turns removing non-empty substrings from s. On each turn, the substring removed must contain an odd number of vowels ('a', 'e', 'i', 'o', 'u'). The player who cannot make a move loses. Alice goes first. The question is: given s, does Alice have a winning strategy?

### Examples  

**Example 1:**  
Input: `s = "elitecoder"`  
Output: `True`  
*Explanation: Alice can always win if there's any vowel. For example, she removes the largest substring with at least one vowel, Bob has no winning move.*

**Example 2:**  
Input: `s = "rhythm"`  
Output: `False`  
*Explanation: The string has no vowels. Alice cannot make a move; Bob wins by default.*

**Example 3:**  
Input: `s = "a"`  
Output: `True`  
*Explanation: Single character and it's a vowel, Alice removes "a" in her turn and wins immediately.*

### Thought Process (as if you’re the interviewee)  

The problem sounds like it might require complex game theory, but let's break it down:
- First, a valid move always requires the substring to have an odd number of vowels.
- If the string has **no vowels**, Alice can't make a move—she loses immediately.
- If there is **at least one vowel**, then Alice can always guarantee a win. She can always pick a substring containing exactly one vowel on her turn (removing it), or even the entire string, and reduce the problem size for Bob in such a way that he cannot win when playing optimally.
- No matter how Bob plays after Alice's first removal (if there is at least one vowel), Alice can always select substrings on her subsequent turns to guarantee the win.

So:
- If there are any vowels, Alice wins.
- If not, Alice loses.

This makes the implementation very straightforward—we only need to check for the presence of any vowel.

### Corner cases to consider  
- Empty string: No vowels, Alice loses.
- String with only consonants: Alice loses.
- String with only vowels: Alice wins.
- String with 1 character: Alice wins if it is a vowel, loses if not.
- Mixed case (uppercase/lowercase): Problem didn't specify, but typically only lowercase vowels matter unless otherwise stated.

### Solution

```python
def doesAliceWin(s: str) -> bool:
    # Define the set of vowels
    vowels = {'a', 'e', 'i', 'o', 'u'}
    
    # Check if any character in s is a vowel
    for c in s:
        if c in vowels:
            return True
    
    # No vowels found, Alice cannot make a move
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. We scan each character once.
- **Space Complexity:** O(1), since we use only a fixed set for vowels and a few variables—no extra space grows with input.

### Potential follow-up questions (as if you’re the interviewer)  

- If the vowel set changes dynamically or includes uppercase, how would you adapt the approach?  
  *Hint: Use str.lower() or expand the vowel set.*

- What if the substring must have exactly *k* vowels instead of "odd number"?  
  *Hint: Now you have to count in all substrings for possible moves.*

- Suppose Alice and Bob can only remove substrings of length ≤ L?  
  *Hint: Need to scan for all valid substrings up to length L containing an odd number of vowels.*

### Summary
This problem is a classic "parity check" disguised as a game theory question: the game reduces to **presence detection** for vowels. If there is at least one vowel, the first player (Alice) always wins. The coding pattern is *"presence scan,"* used in problems like "Does string s contain X element?" This is a very common interview trick—look for simple observations before implementing complex logic.

### Tags
Math(#math), String(#string), Brainteaser(#brainteaser), Game Theory(#game-theory)

### Similar Problems
