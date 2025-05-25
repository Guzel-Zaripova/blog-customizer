import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	stateArticle: ArticleStateType;
	setStateArticle: (data: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	stateArticle,
	setStateArticle,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedStateArticle, setSelectedStateArticle] =
		useState<ArticleStateType>(stateArticle);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleChangeSelectedState = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectedStateArticle({ ...selectedStateArticle, [key]: value });
	};

	const handleSubmitStateArticle = (event: SyntheticEvent) => {
		event.preventDefault();
		setStateArticle(selectedStateArticle);
	};

	const resetToDefaultState = () => {
		setStateArticle(defaultArticleState);
		setSelectedStateArticle(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef: containerRef,
		onClose: () => setIsOpen(!isOpen),
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={containerRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmitStateArticle}>
					<Text as='h1' weight={800} size={31} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={selectedStateArticle.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							handleChangeSelectedState('fontFamilyOption', option)
						}
						title='Шрифт'
					/>

					<RadioGroup
						selected={selectedStateArticle.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) =>
							handleChangeSelectedState('fontSizeOption', option)
						}
						title={'Размер шрифта'}
						name={'fontSizeOption'}
					/>

					<Select
						selected={selectedStateArticle.fontColor}
						options={fontColors}
						onChange={(option) =>
							handleChangeSelectedState('fontColor', option)
						}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={selectedStateArticle.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							handleChangeSelectedState('backgroundColor', option)
						}
						title='Цвет фона'
					/>

					<Select
						selected={selectedStateArticle.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							handleChangeSelectedState('contentWidth', option)
						}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetToDefaultState}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
