from typing import Any, Dict


class AIService:
    async def generate(self, prompt: str, context: Dict[str, Any] | None = None) -> Dict[str, Any]:
        raise NotImplementedError("AI generation not yet implemented")

    async def improve_prompt(self, prompt: str) -> Dict[str, Any]:
        raise NotImplementedError("AI improvement not yet implemented")

    async def generate_story_flow(self, prompt: str) -> Dict[str, Any]:
        raise NotImplementedError("AI story flow generation not yet implemented")


ai_service = AIService()
