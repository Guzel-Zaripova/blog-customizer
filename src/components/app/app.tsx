import { useState, CSSProperties } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import styles from './app.module.scss';

export const App = () => {
	const [currentStateArticle, setCurrentStateArticle] =
		useState<ArticleStateType>(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentStateArticle.fontFamilyOption.value,
					'--font-size': currentStateArticle.fontSizeOption.value,
					'--font-color': currentStateArticle.fontColor.value,
					'--container-width': currentStateArticle.contentWidth.value,
					'--bg-color': currentStateArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				stateArticle={currentStateArticle}
				setStateArticle={setCurrentStateArticle}
			/>
			<Article />
		</main>
	);
};
